import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Order, OrderItem } from '../../types';
import api from '../../services/api';
import classes from '../../styles/components/Dashboard.module.css';
import { jsPDF } from 'jspdf';
import { ArrowLeft, Download, Package } from 'lucide-react';
import OrderFeedbackForm from '../../components/dashboard/OrderFeedbackForm';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;
            try {
                const response = await api.get(`/orders/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error("Failed to fetch order", error);
            }
        };
        fetchOrder();
    }, [id]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const downloadReceipt = () => {
        const doc = new jsPDF();
        const primaryColor = '#1a1a1a';
        const accentColor = '#D4A017';
        const secondaryColor = '#666666';

        // Add Header Background
        doc.setFillColor(primaryColor);
        doc.rect(0, 0, 210, 40, 'F');

        // Logo/Brand
        doc.setTextColor('#ffffff');
        doc.setFontSize(24);
        doc.setFont('times', 'bold');
        doc.text('CANDLE.', 20, 25);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Exquisite Handcrafted Candles', 20, 32);

        // Header Info
        doc.setTextColor('#ffffff');
        doc.setFontSize(10);
        doc.text(`Invoice #: INV-${order.id}`, 150, 20);
        doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 150, 27);
        doc.text(`Status: ${order.status.toUpperCase()}`, 150, 34);

        // Content
        doc.setTextColor(primaryColor);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Shipping Information', 20, 55);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(secondaryColor);
        doc.text(order.shippingName, 20, 62);
        doc.text(order.shippingAddress, 20, 67);
        doc.text(`${order.shippingCity}, ${order.shippingZip}`, 20, 72);
        doc.text(`Phone: ${order.shippingPhone}`, 20, 77);

        // Payment Info
        doc.setTextColor(primaryColor);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Payment Method', 120, 55);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(secondaryColor);
        doc.text(order.paymentMethod || 'Cash on Delivery', 120, 62);

        // Table Header
        let y = 95;
        doc.setFillColor(accentColor);
        doc.rect(20, y, 170, 10, 'F');
        doc.setTextColor('#ffffff');
        doc.setFont('helvetica', 'bold');
        doc.text('Product Name', 25, y + 7);
        doc.text('Qty', 110, y + 7);
        doc.text('Price', 140, y + 7);
        doc.text('Total', 170, y + 7);

        // Table Content
        y += 10;
        doc.setFont('helvetica', 'normal');
        order.items.forEach((item: OrderItem, index: number) => {
            if (index % 2 === 0) {
                doc.setFillColor('#fafafa');
                doc.rect(20, y, 170, 10, 'F');
            }
            doc.setTextColor(primaryColor);
            doc.text(item.productName || `Item #${item.productId}`, 25, y + 7);
            doc.text(item.quantity.toString(), 110, y + 7);
            doc.text(`$${item.price.toFixed(2)}`, 140, y + 7);
            doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 170, y + 7);
            y += 10;
        });

        // Totals
        y += 10;
        doc.setDrawColor(accentColor);
        doc.setLineWidth(0.5);
        doc.line(130, y, 190, y);
        y += 10;

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Grand Total:', 130, y);
        doc.setTextColor(accentColor);
        doc.text(`$${order.total.toFixed(2)}`, 170, y);

        // Footer
        doc.setTextColor(secondaryColor);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.text('Thank you for your purchase!', 105, 280, { align: 'center' });
        doc.text('Visit us again at www.candle.com', 105, 285, { align: 'center' });

        doc.save(`receipt-${order.id}.pdf`);
    };

    // Status Tracker Logic
    const statuses = ['Pending', 'Processing', 'Shipped', 'In Transit', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(order.status) === -1 ? 0 : statuses.indexOf(order.status);

    return (
        <div>
            <button onClick={() => navigate('/dashboard/orders')} className="btn btn-outline" style={{ border: 'none', paddingLeft: 0, marginBottom: '1rem' }}>
                <ArrowLeft size={18} /> Back to Orders
            </button>

            <div className={classes.detailHeader}>
                <div>
                    <h2>Order Details #{order.id}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <button onClick={downloadReceipt} className="btn btn-outline">
                    <Download size={18} /> Download Receipt
                </button>
            </div>

            {/* Status Tracker */}
            <div style={{ margin: '2rem 0', padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    {/* Progress Bar Background */}
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: '#eee', zIndex: 0, transform: 'translateY(-50%)' }} />

                    {/* Active Progress Bar */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%`,
                        height: '4px',
                        background: '#4CAF50',
                        zIndex: 0,
                        transform: 'translateY(-50%)',
                        transition: 'width 0.3s ease'
                    }} />

                    {statuses.map((status, index) => {
                        const isCompleted = index <= currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;

                        return (
                            <div key={status} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: isCompleted ? '#4CAF50' : '#eee',
                                    border: isCurrent ? '2px solid white' : 'none',
                                    boxShadow: isCurrent ? '0 0 0 2px #4CAF50' : 'none'
                                }}></div>
                                <span style={{ fontSize: '0.8rem', color: isCompleted ? '#333' : '#999', fontWeight: isCompleted ? 500 : 400 }}>{status}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={classes.content}>
                <div className={classes.itemList}>
                    {order.items.map((item: OrderItem) => (
                        <div key={item.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <div className={classes.itemRow}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {/* Placeholder Image because OrderItem doesn't store Image URL currently */}
                                    <div style={{ width: 60, height: 60, background: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Package size={24} color="#ccc" />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0 }}>{item.productName}</h4>
                                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>${item.price.toFixed(2)} x {item.quantity}</p>
                                    </div>
                                </div>
                                <div style={{ fontWeight: 600 }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Feedback Section - Only if Delivered */}
                    {order.status === 'Delivered' && (
                        <div style={{ marginTop: '2rem' }}>
                            <OrderFeedbackForm
                                order={order}
                                onFeedbackSubmitted={(feedback) => {
                                    setOrder((prev: Order | null) => prev ? { ...prev, feedback } : null);
                                }}
                            />
                        </div>
                    )}

                </div>

                <div className={classes.totals}>
                    <div className={classes.totalRow}>
                        <span>Total Amount</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Payment Method: {order.paymentMethod}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
