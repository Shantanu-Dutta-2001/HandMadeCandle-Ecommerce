import React, { useState } from 'react';
import type { Order } from '../../types';
import api from '../../services/api';
import classes from '../../styles/components/Dashboard.module.css';
import { Package, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderFeedbackForm from '../../components/dashboard/OrderFeedbackForm';

const OrderHistory = () => {
    const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');
    const [orders, setOrders] = useState<Order[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders/my-orders');
                if (response.data) {
                    setOrders(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();
    }, []);

    // Sorting orders by date desc
    const sortedOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const currentOrders = sortedOrders.filter(order => order.status !== 'Delivered');
    const pastOrders = sortedOrders.filter(order => order.status === 'Delivered');

    const displayedOrders = activeTab === 'current' ? currentOrders : pastOrders;

    // Logic for recently delivered: Most recent order with status 'Delivered'
    const recentlyDeliveredId = pastOrders.length > 0 ? pastOrders[0].id : null;

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

    return (
        <div>
            <div className={classes.detailHeader}>
                <h2>My Orders</h2>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('current')}
                    className={activeTab === 'current' ? 'btn btn-primary' : 'btn btn-outline'}
                    style={{ borderRadius: '20px' }}
                >
                    Current Orders
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={activeTab === 'past' ? 'btn btn-primary' : 'btn btn-outline'}
                    style={{ borderRadius: '20px' }}
                >
                    Past Orders
                </button>
            </div>

            <div className={classes.orderList}>
                {displayedOrders.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No orders found in this category.</p>
                ) : (
                    displayedOrders.map(order => (
                        <div key={order.id} className={classes.orderCardContainer}>
                            <div className={classes.orderCard} onClick={() => navigate(`/dashboard/orders/${order.id}`)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <div className={classes.orderInfo}>
                                    <h3>Order #{order.id}</h3>
                                    <div className={classes.meta}>
                                        <span>{new Date(order.date).toLocaleDateString()}</span>
                                        <span>{order.items.length} items</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className={`${classes.status} ${classes[order.status?.toLowerCase() || 'pending']}`}>
                                    {order.id === recentlyDeliveredId && (
                                        <span style={{
                                            background: 'var(--color-success)',
                                            color: 'white',
                                            padding: '2px 8px',
                                            borderRadius: '10px',
                                            fontSize: '0.7rem',
                                            marginRight: '0.5rem',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            Recently Delivered
                                        </span>
                                    )}
                                    {order.status === 'Delivered' && <CheckCircle size={18} color={getStatusColor(order.status)} />}
                                    {order.status !== 'Delivered' && <Package size={18} color={getStatusColor(order.status)} />}
                                    <span style={{ marginLeft: '0.5rem', color: getStatusColor(order.status) }}>{order.status}</span>
                                </div>
                            </div>

                            {order.status === 'Delivered' && (
                                <OrderFeedbackForm
                                    order={order}
                                    onFeedbackSubmitted={(feedback) => {
                                        setOrders(prev => prev.map(o =>
                                            o.id === order.id ? { ...o, feedback } : o
                                        ));
                                    }}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
