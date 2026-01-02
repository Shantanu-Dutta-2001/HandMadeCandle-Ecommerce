import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import classes from '../../styles/components/CartDrawer.module.css';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <>
            <div
                className={`${classes.overlay} ${isOpen ? classes.open : ''}`}
                onClick={onClose}
            />
            <div className={`${classes.drawer} ${isOpen ? classes.open : ''}`}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        <ShoppingCart size={20} />
                        <span>Your Cart</span>
                        <span className={classes.count}>({items.length})</span>
                    </div>
                    <button onClick={onClose} className={classes.closeBtn}>
                        <X size={24} />
                    </button>
                </div>

                <div className={classes.content}>
                    {items.length === 0 ? (
                        <div className={classes.emptyState}>
                            <ShoppingCart size={48} />
                            <p>Your cart is empty</p>
                            <button onClick={() => { onClose(); navigate('/shop'); }} className="btn btn-primary">
                                Shop Now
                            </button>
                        </div>
                    ) : (
                        <div className={classes.itemList}>
                            {items.map(item => (
                                <div key={item.id} className={classes.item}>
                                    <img src={item.image} alt={item.name} className={classes.itemImage} />
                                    <div className={classes.itemInfo}>
                                        <h4>{item.name}</h4>
                                        <p className={classes.itemPrice}>${item.price.toFixed(2)}</p>
                                        <div className={classes.controls}>
                                            <div className={classes.qtySelector}>
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className={classes.removeBtn}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={classes.footer}>
                    <div className={classes.summary}>
                        <span>Subtotal</span>
                        <span className={classes.totalAmount}>${cartTotal.toFixed(2)}</span>
                    </div>
                    {items.length === 0 && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center', fontWeight: 500 }}>
                            No items in cart to checkout
                        </p>
                    )}
                    <button
                        onClick={handleCheckout}
                        className={classes.checkoutBtn}
                        disabled={items.length === 0}
                        style={items.length === 0 ? { opacity: 0.5, cursor: 'not-allowed', filter: 'grayscale(1)' } : {}}
                    >
                        Checkout <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
