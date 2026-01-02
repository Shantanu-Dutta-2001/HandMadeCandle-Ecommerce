import { useCart } from '../../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../../styles/components/Cart.module.css';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>

            <div className={classes.grid}>
                <div className={classes.items}>
                    {items.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', background: '#f9f9f9', borderRadius: '12px', border: '1px dashed #ddd' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Your cart is empty. Looks like you haven't added any candles yet.</p>
                            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className={classes.item}>
                                <div className={classes.imageContainer}>
                                    <img src={item.image} alt={item.name} className={classes.image} />
                                </div>
                                <div className={classes.itemDetails}>
                                    <h3>{item.name}</h3>
                                    <p className={classes.price}>${item.price.toFixed(2)}</p>
                                    <div className={classes.controls}>
                                        <div className={classes.qtySelector}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <button className={classes.removeBtn} onClick={() => removeFromCart(item.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className={classes.itemTotal}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={classes.summary}>
                    <h3>Order Summary</h3>
                    <div className={classes.summaryRow}>
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
                zIndex: 1000
            }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>Total</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>${cartTotal.toFixed(2)}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                    style={{
                        background: items.length === 0 ? '#ccc' : '#D4A017',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        borderRadius: '50px',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        border: 'none',
                        cursor: items.length === 0 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: items.length === 0 ? 'none' : '0 4px 15px rgba(212, 160, 23, 0.3)',
                        opacity: items.length === 0 ? 0.7 : 1
                    }}
                >
                    Checkout <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Cart;
