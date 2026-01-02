import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { DashboardStats } from '../../types';
import { DollarSign, Package, ShoppingBag, Clock } from 'lucide-react';
import React from 'react';

const AdminDashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/orders/stats'); // Backend endpoint to be verified
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;
    if (!stats) return <div>Error loading stats.</div>;

    const findStatusCount = (status: string) =>
        stats.statusBreakdown.find(s => s.status === status)?.count || 0;

    return (
        <div>
            <h1 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>Dashboard Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toFixed(2)}`}
                    icon={<DollarSign size={24} color="var(--color-accent)" />}
                />
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={<ShoppingBag size={24} color="#2196F3" />}
                />
                <StatCard
                    title="Pending Orders"
                    value={findStatusCount('Pending')}
                    icon={<Clock size={24} color="#FFD700" />}
                />
                <StatCard
                    title="Delivered Orders"
                    value={findStatusCount('Delivered')}
                    icon={<Package size={24} color="#4CAF50" />}
                />
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Order Status Breakdown</h3>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    {stats.statusBreakdown.map((item) => (
                        <div key={item.status} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-accent)' }}></div>
                            <span style={{ fontWeight: 500 }}>{item.status}:</span>
                            <span>{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Helper Component
const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <div style={{
        padding: '1.5rem',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
        <div style={{ padding: '1rem', borderRadius: '50%', background: 'var(--bg-primary)' }}>
            {icon}
        </div>
        <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{title}</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</h3>
        </div>
    </div>
);

export default AdminDashboard;
