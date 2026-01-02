import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import classes from '../styles/components/Dashboard.module.css';
import { LayoutDashboard, ShoppingBag, Package, MessageSquare, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Protect Admin Route
    if (!user || user.role !== 'Admin') {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div className={classes.dashboardGrid}>
                {/* Admin Sidebar */}
                <aside className={classes.sidebar}>
                    <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-accent)' }}>Admin Panel</h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Welcome, {user.name}</p>
                    </div>

                    <nav className={classes.nav}>
                        <NavLink
                            to="/admin"
                            end
                            className={({ isActive }) => isActive ? classes.active : ''}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <LayoutDashboard size={18} /> Dashboard
                            </div>
                        </NavLink>

                        <NavLink
                            to="/admin/products"
                            className={({ isActive }) => isActive ? classes.active : ''}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ShoppingBag size={18} /> Products
                            </div>
                        </NavLink>

                        <NavLink
                            to="/admin/orders"
                            className={({ isActive }) => isActive ? classes.active : ''}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Package size={18} /> Orders
                            </div>
                        </NavLink>

                        <NavLink
                            to="/admin/queries"
                            className={({ isActive }) => isActive ? classes.active : ''}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MessageSquare size={18} /> Queries
                            </div>
                        </NavLink>

                    </nav>

                    <button
                        onClick={handleLogout}
                        className="btn btn-outline"
                        style={{ marginTop: '2rem', width: '100%', borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <LogOut size={18} /> Logout
                        </div>
                    </button>
                </aside>

                {/* Admin Content Area */}
                <main className={classes.content} style={{ minHeight: '80vh' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
