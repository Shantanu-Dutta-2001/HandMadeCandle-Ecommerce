import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import classes from '../../styles/components/DashboardLayout.module.css';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, User, LogOut, Store, ShoppingCart } from 'lucide-react';
import CartDrawer from '../shop/CartDrawer';

interface DashboardLayoutProps {
    children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { logout } = useAuth();
    const { cartTotal, items } = useCart();
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={classes.dashboardContainer}>
            <aside className={classes.sidebar}>
                <div className={classes.userWelcome}>
                    <h3>My Account</h3>
                </div>
                <nav className={classes.navigation}>
                    <NavLink
                        to="/dashboard/orders"
                        className={({ isActive }) => isActive ? `${classes.navItem} ${classes.active}` : classes.navItem}
                    >
                        <ShoppingBag size={20} />
                        <span>My Orders</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) => isActive ? `${classes.navItem} ${classes.active}` : classes.navItem}
                    >
                        <User size={20} />
                        <span>Profile</span>
                    </NavLink>

                    <div className={classes.navDivider}>Shop & Support</div>

                    <NavLink
                        to="/shop"
                        className={({ isActive }) => isActive ? `${classes.navItem} ${classes.active}` : classes.navItem}
                    >
                        <Store size={20} />
                        <span>Shop</span>
                    </NavLink>
                    <button onClick={() => setIsCartOpen(true)} className={classes.navItem} style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
                        <div style={{ position: 'relative' }}>
                            <ShoppingCart size={20} />
                            {items.length > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    background: 'var(--color-accent)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '16px',
                                    height: '16px',
                                    fontSize: '0.65rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {items.length}
                                </span>
                            )}
                        </div>
                        <span style={{ flex: 1 }}>View Cart</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--color-accent)' }}>${cartTotal.toFixed(2)}</span>
                    </button>

                    <button onClick={handleLogout} className={classes.logoutBtn}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>
            <main className={classes.content}>
                {children || <Outlet />}
            </main>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default DashboardLayout;
