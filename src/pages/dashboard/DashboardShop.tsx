import React from 'react';
import { PRODUCTS } from '../../services/mockData';
import api from '../../services/api';
import shopClasses from '../../styles/components/Shop.module.css';
import ProductCard from '../../components/shop/ProductCard';

const DashboardShop = () => {
    const [products, setProducts] = React.useState(PRODUCTS);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                if (response.data && response.data.length > 0) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <header className={shopClasses.header} style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Our <span>Signature Collection</span></h2>
                <p>Exclusive handcrafted candles for members</p>
            </header>

            <div className={shopClasses.grid}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default DashboardShop;
