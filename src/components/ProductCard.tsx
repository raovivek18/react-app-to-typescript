import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    index?: number;
}

const ProductCard = React.memo(({ product, index = 0 }: ProductCardProps) => {
    const dispatch = useAppDispatch();
    const { addToast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(addToCart(product));
        addToast(`${product.title} added to cart`, 'success');
    };

    const imageUrl = product.images[0]?.replace(/[\[\]"]/g, '') || 'https://via.placeholder.com/300';

    return (
        <motion.div
            className="product-card premium-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ y: -8 }}
        >
            <div className="card-image-wrapper">
                <img src={imageUrl} alt={product.title} loading="lazy" />
                <div className="card-actions">
                    <Link to={`/product/${product.id}`} className="action-btn" title="View Details">
                        <Eye size={18} />
                    </Link>
                    <motion.button
                        className="action-btn primary"
                        onClick={handleAddToCart}
                        title="Add to Bag"
                        whileTap={{ scale: 0.9 }}
                    >
                        <ShoppingCart size={18} />
                    </motion.button>
                </div>
                {product.category && (
                    <span className="card-badge-top glass">{product.category.name}</span>
                )}
            </div>

            <div className="card-content">
                <Link to={`/product/${product.id}`} className="card-title">
                    {product.title}
                </Link>
                <div className="card-footer">
                    <div className="price-group">
                        <span className="price-label">Price</span>
                        <span className="card-price">${product.price}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

export default ProductCard;

