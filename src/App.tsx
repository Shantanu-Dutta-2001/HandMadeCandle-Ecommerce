import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductList from './pages/shop/ProductList';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';

import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import FAQ from './pages/faq/FAQ';
import Dashboard from './pages/dashboard/Dashboard';
import About from './pages/about/About';
import Shipping from './pages/policies/Shipping';
import Returns from './pages/policies/Returns';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminQueries from './pages/admin/AdminQueries';
import NotFound from './pages/NotFound';

import { useAuth } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import { Toaster } from 'react-hot-toast';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1a1a1a',
                color: '#f5f5dc',
                border: '1px solid #D4A017',
                borderRadius: '12px',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 8px 24px rgba(212, 160, 23, 0.15)',
              },
            }}
          />
          <Routes>
            {/* Public Routes with Navbar/Footer */}
            <Route element={<PublicLayout><Outlet /></PublicLayout>}>
              <Route path="/HandMadeCandle-Ecommerce/" element={<Home />} />
              <Route path="/shop" element={<ProductList />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Private Routes without global Navbar/Footer */}
            <Route path="/dashboard/*" element={<Dashboard />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="queries" element={<AdminQueries />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
