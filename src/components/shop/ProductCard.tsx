import React from 'react';
import type { Product } from '../../services/mockData';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import classes from '../../styles/components/Shop.module.css';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { items, addToCart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const cartItem = items.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleInteraction = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity > 1) {
            updateQuantity(product.id, quantity - 1);
        } else {
            removeFromCart(product.id);
        }
    };

    return (
        <div className={classes.card} onClick={() => navigate(`/shop/${product.id}`)}>
            <div className={classes.imageContainer}>
                <img src={product.image} alt={product.name} className={classes.image} />
            </div>
            <div className={classes.details}>
                <div className={classes.info}>
                    <h3>{product.name}</h3>
                    <p className={classes.category}>{product.category}</p>
                    <p className={classes.price}>${product.price.toFixed(2)}</p>
                </div>

                <div onClick={handleInteraction}>
                    {quantity === 0 ? (
                        <button
                            className={`btn btn-primary ${classes.addBtn}`}
                            onClick={handleIncrement}
                        >
                            <ShoppingBag size={18} /> Add
                        </button>
                    ) : (
                        <div className={classes.quantityControls}>
                            <button className={classes.qtyBtn} onClick={handleDecrement}>
                                <Minus size={16} />
                            </button>
                            <span className={classes.qtyValue}>{quantity}</span>
                            <button className={classes.qtyBtn} onClick={handleIncrement}>
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
