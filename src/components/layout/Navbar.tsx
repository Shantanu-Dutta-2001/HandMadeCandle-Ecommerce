import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import classes from './Navbar.module.css';
import CartDrawer from '../shop/CartDrawer';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const { logout, isAuthenticated } = useAuth();
    const { items } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const handleOpenCart = () => setIsCartOpen(true);
        window.addEventListener('open-cart', handleOpenCart);
        return () => window.removeEventListener('open-cart', handleOpenCart);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={classes.navbar}>
            <div className={`container ${classes.navContainer}`}>
                <Link to="/" className={classes.logo}>
                    CANDLE.
                </Link>

                {/* Desktop Nav */}
                <div className={classes.desktopNav}>
                    <Link to="/shop" className={classes.navLink}>Shop</Link>
                    {!isAuthenticated && (
                        <>
                            <Link to="/contact" className={classes.navLink}>Contact</Link>
                            <Link to="/faq" className={classes.navLink}>FAQ</Link>
                        </>
                    )}
                </div>

                <div className={classes.actions}>
                    {isAuthenticated && (
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className={classes.iconBtn}
                            style={{
                                position: 'relative',
                                opacity: items.length === 0 ? 0.6 : 1,
                                cursor: items.length === 0 ? 'default' : 'pointer'
                            }}
                            title={items.length === 0 ? "Your cart is empty" : "View Cart"}
                        >
                            <ShoppingCart size={20} />
                            {items.length > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    background: 'var(--color-accent)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    fontSize: '0.7rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {items.length}
                                </span>
                            )}
                        </button>
                    )}

                    {isAuthenticated ? (
                        <div className={classes.userMenu}>
                            <Link to="/dashboard" className={classes.iconBtn} title="Dashboard">
                                <User size={20} />
                            </Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className={classes.authLinks}>
                            <Link to="/login" className={classes.navLink}>Login</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </div>
                    )}

                    <button className={classes.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={classes.mobileMenu}>
                    <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                    {!isAuthenticated && (
                        <>
                            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                            <Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                        </>
                    )}
                    {!isAuthenticated && (
                        <>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
