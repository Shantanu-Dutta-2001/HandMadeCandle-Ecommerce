import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Order } from '../../types';
import { Filter } from 'lucide-react';
import classes from '../../styles/components/Dashboard.module.css';

const AdminOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (filterStatus === 'All') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(o => o.status === filterStatus));
        }
    }, [filterStatus, orders]);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/admin/orders');
            setOrders(response.data);
            setFilteredOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: number, currentStatus: string) => {
        const statuses = ['Pending', 'Processing', 'Shipped', 'In Transit', 'Delivered'];
        const nextIndex = (statuses.indexOf(currentStatus) + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];

        // Optimistic update
        const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: nextStatus } : o);
        setOrders(updatedOrders);

        try {
            await api.put(`/admin/orders/${orderId}/status`, JSON.stringify(nextStatus), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error("Failed to update status", error);
            fetchOrders(); // Revert on fail
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'var(--text-secondary)';
            case 'Processing': return 'var(--color-info)';
            case 'Shipped': return 'var(--color-warning)';
            case 'In Transit': return 'var(--color-transit)';
            case 'Delivered': return 'var(--color-success)';
            default: return 'var(--text-secondary)';
        }
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Manage Orders</h1>

                <div style={{ position: 'relative', minWidth: '200px' }}>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid var(--border-subtle)',
                            appearance: 'none',
                            background: 'var(--bg-secondary)',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    <Filter size={18} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
                </div>
            </div>

            <div className={classes.orderList}>
                {filteredOrders.map(order => (
                    <div key={order.id} className={classes.orderCard} style={{ cursor: 'default' }}>
                        <div className={classes.orderHeader}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Order #{order.id}</h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {new Date(order.date).toLocaleDateString()} • {order.items?.length || 0} Items
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className={classes.orderTotal}>${order.total.toFixed(2)}</div>

                                {/* Clickable Status Pill */}
                                <button
                                    onClick={() => updateStatus(order.id, order.status)}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '16px',
                                        padding: '4px 12px',
                                        marginTop: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.85rem',
                                        color: getStatusColor(order.status),
                                        fontWeight: 600
                                    }}
                                    title="Click to advance status"
                                >
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: getStatusColor(order.status)
                                    }}></span>
                                    {order.status}
                                </button>
                            </div>
                        </div>
                        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', fontSize: '0.9rem' }}>
                            <strong>Ship To:</strong> {order.shippingName}, {order.shippingCity}
                        </div>
                    </div>
                ))}

                {filteredOrders.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
