import React from 'react';
import { PRODUCTS } from '../../services/mockData';
import api from '../../services/api';
import classes from '../../styles/components/Shop.module.css';
import ProductCard from '../../components/shop/ProductCard';

const ProductList = () => {
    const [products, setProducts] = React.useState(PRODUCTS); // Init with empty or keep mock as fallback? 
    // Let's initialize with empty array and fetch.
    // Actually, to avoid "flash of empty", maybe we should show loading.

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                // If API returns data, use it. 
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
        <div className="container">
            <header className={classes.header}>
                <h1>Our <span>Signature Collection</span></h1>
                <p>Handcrafted candles to illuminate your moments</p>
            </header>

            <div className={classes.grid}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
