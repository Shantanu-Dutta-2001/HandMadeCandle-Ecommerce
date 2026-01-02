import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import OrderHistory from './OrderHistory';
import OrderDetail from './OrderDetail';
import UserProfile from './UserProfile';

const Dashboard = () => {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route index element={<Navigate to="orders" replace />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="orders/:id" element={<OrderDetail />} />
                <Route path="profile" element={<UserProfile />} />
            </Route>
        </Routes>
    );
};

export default Dashboard;
