import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import classes from '../../styles/components/Checkout.module.css';
import AddressForm from '../../components/AddressForm';
import { type Address } from '../../types';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { items, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [countdown, setCountdown] = useState(5);

    // Fetch saved addresses on mount if user is logged in
    useEffect(() => {
        const fetchAddresses = async () => {
            if (user) {
                try {
                    const response = await api.get('/address');
                    setSavedAddresses(response.data);

                    // Auto-select default address
                    const defaultAddress = response.data.find((addr: Address) => addr.isDefault);
                    if (defaultAddress) setSelectedAddress(defaultAddress);
                } catch (error) {
                    console.error('Failed to fetch addresses', error);
                }
            }
        };
        fetchAddresses();
    }, [user]);

    // Handle countdown and redirect
    useEffect(() => {
        let timer: any;
        if (orderSuccess && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (orderSuccess && countdown === 0) {
            navigate('/dashboard/orders');
        }
        return () => clearTimeout(timer);
    }, [orderSuccess, countdown, navigate]);

    const handleSaveAddress = async (formData: Address) => {
        try {
            const response = await api.post('/address', formData);
            const newAddress = response.data;
            setSavedAddresses([...savedAddresses, newAddress]);
            setSelectedAddress(newAddress);
            setShowAddressForm(false);
        } catch (error) {
            console.error('Failed to save address', error);
            alert('Failed to save address.');
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert('Please select a shipping address.');
            return;
        }

        setLoading(true);
        try {
            const orderItems = items.map(item => ({
                productId: parseInt(item.id),
                quantity: item.quantity,
                price: item.price
            }));

            const orderData = {
                items: orderItems,
                total: cartTotal,
                paymentMethod: 'COD',
                shippingName: selectedAddress.name,
                shippingAddress: selectedAddress.addressLine,
                shippingCity: selectedAddress.city,
                shippingZip: selectedAddress.zip,
                shippingPhone: selectedAddress.phone
            };

            await api.post('/orders', orderData);

            clearCart();
            setOrderSuccess(true);
        } catch (error) {
            console.error('Order failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Safety check for empty cart
    useEffect(() => {
        if (items.length === 0 && !loading && !orderSuccess) {
            navigate('/cart');
        }
    }, [items, navigate, loading, orderSuccess]);

    if (orderSuccess) {
        return (
            <div className={classes.successScreen}>
                <div className={classes.successIcon}>
                    <CheckCircle size={64} />
                </div>
                <h1 className={classes.successTitle}>Thank you for shopping with us!</h1>
                <p className={classes.successText}>
                    Your order has been placed successfully. You will receive an email confirmation shortly.
                </p>
                <div className={classes.countdownText}>
                    Redirecting to your orders in {countdown} seconds...
                </div>
                <button
                    className={classes.btnSecondary}
                    onClick={() => navigate('/dashboard/orders')}
                    style={{ marginTop: '1rem' }}
                >
                    View Orders Now
                </button>
            </div>
        );
    }

    if (items.length === 0) return null;

    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>

            <div className={classes.stepper}>
                <div className={`${classes.step} ${step >= 1 ? classes.active : ''}`}>1. Review Cart</div>
                <div className={classes.line}></div>
                <div className={`${classes.step} ${step >= 2 ? classes.active : ''}`}>2. Shipping Address</div>
                <div className={classes.line}></div>
                <div className={`${classes.step} ${step >= 3 ? classes.active : ''}`}>3. Place Order</div>
            </div>

            <div className={classes.content}>
                {/* STEP 1: REVIEW CART */}
                {step === 1 && (
                    <div className={classes.stepContent}>
                        <h2>Order Summary</h2>
                        <div className={classes.cartReview}>
                            {items.map(item => (
                                <div key={item.id} className={classes.reviewItem}>
                                    <div className={classes.itemInfo}>
                                        <span className={classes.itemName}>{item.name}</span>
                                        <span className={classes.itemMeta}>Qty: {item.quantity}</span>
                                    </div>
                                    <span className={classes.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className={classes.reviewTotal}>
                                <span>Total Amount</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className={classes.btnPrimary} onClick={() => setStep(2)}>
                            Next: Select Address
                        </button>
                    </div>
                )}

                {/* STEP 2: ADDRESS */}
                {step === 2 && (
                    <div className={classes.stepContent}>
                        <h2>Select Shipping Address</h2>

                        {!showAddressForm ? (
                            <>
                                {savedAddresses.length > 0 ? (
                                    <div className={classes.addressList}>
                                        {savedAddresses.map(addr => (
                                            <div
                                                key={addr.id}
                                                className={`${classes.addressCard} ${selectedAddress?.id === addr.id ? classes.selected : ''}`}
                                                onClick={() => setSelectedAddress(addr)}
                                            >
                                                <div className={classes.cardHeader}>
                                                    <strong>{addr.name}</strong>
                                                    {addr.isDefault && <span className={classes.badge}>Default</span>}
                                                </div>
                                                <p>{addr.addressLine}</p>
                                                <p>{addr.city}, {addr.zip}</p>
                                                <p>{addr.phone}</p>
                                                {selectedAddress?.id === addr.id && (
                                                    <div className={classes.checkIcon}>Example Check Icon or 'Selected'</div>
                                                    // Simplified for now, styling will handle visual feedback
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No saved addresses found. Please add one.</p>
                                )}

                                <button
                                    className={classes.btnSecondary}
                                    onClick={() => setShowAddressForm(true)}
                                    style={{ marginTop: '1rem' }}
                                >
                                    + Add New Address
                                </button>

                                <div className={classes.actions}>
                                    <button className={classes.btnSecondary} onClick={() => setStep(1)}>Back</button>
                                    <button
                                        className={classes.btnPrimary}
                                        onClick={() => setStep(3)}
                                        disabled={!selectedAddress}
                                    >
                                        Next: Review & Submit
                                    </button>
                                </div>
                            </>
                        ) : (
                            <AddressForm
                                onSubmit={handleSaveAddress}
                                onCancel={() => setShowAddressForm(false)}
                            />
                        )}
                    </div>
                )}

                {/* STEP 3: SUBMIT */}
                {step === 3 && (
                    <div className={classes.stepContent}>
                        <h2>Final Review</h2>

                        <div className={classes.finalReviewGrid}>
                            <div className={classes.section}>
                                <h3>Shipping To</h3>
                                {selectedAddress && (
                                    <div className={classes.addressSummary}>
                                        <p><strong>{selectedAddress.name}</strong></p>
                                        <p>{selectedAddress.addressLine}</p>
                                        <p>{selectedAddress.city}, {selectedAddress.zip}</p>
                                        <p>{selectedAddress.phone}</p>
                                    </div>
                                )}
                                <button className={classes.linkBtn} onClick={() => setStep(2)}>Change</button>
                            </div>

                            <div className={classes.section}>
                                <h3>Payment Method</h3>
                                <p>Cash On Delivery (COD)</p>
                            </div>

                            <div className={classes.section}>
                                <h3>Order Total</h3>
                                <p className={classes.bigTotal}>${cartTotal.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className={classes.actions}>
                            <button className={classes.btnSecondary} onClick={() => setStep(2)}>Back</button>
                            <button
                                className={classes.btnPrimary}
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
