import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../../services/mockData';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import classes from '../../styles/components/ProductDetail.module.css';

const ProductDetail = () => {
    const { id } = useParams();
    const product = PRODUCTS.find(p => p.id === id);
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);

    if (!product) {
        return <div className="container">Product not found</div>;
    }

    const handleAddToCart = () => {
        addToCart(product, qty);
        window.dispatchEvent(new Event('open-cart'));
    };

    return (
        <div className="container">
            <div className={classes.wrapper}>
                <div className={classes.imageSection}>
                    <img src={product.image} alt={product.name} className={classes.mainImage} />
                </div>
                <div className={classes.infoSection}>
                    <p className={classes.category}>{product.category}</p>
                    <h1>{product.name}</h1>
                    <div className={classes.price}>${product.price.toFixed(2)}</div>
                    <p className={classes.description}>{product.description}</p>

                    <div className={classes.actions}>
                        <div className={classes.qtySelector}>
                            <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                            <span>{qty}</span>
                            <button onClick={() => setQty(qty + 1)}>+</button>
                        </div>
                        <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
