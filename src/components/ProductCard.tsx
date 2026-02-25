import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    index?: number;
}

const ProductCard = memo(({ product, index = 0 }: ProductCardProps) => {
    const imageUrl = product.images[0]?.replace(/[\[\]"]/g, '') || 'https://via.placeholder.com/300';

    return (
        <motion.div
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
            }}
        >
            <Link to={`/product/${product.id}`} className="card-link">
                <div className="card-image-wrapper">
                    <img src={imageUrl} alt={product.title} loading="lazy" />
                </div>

                <div className="card-content">
                    <h3 className="card-title">{product.title}</h3>
                    <div className="card-rating">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < 4 ? "#FFC633" : "none"} color={i < 4 ? "#FFC633" : "#FFC633"} />
                            ))}
                        </div>
                        <span className="rating-value">4.5/5</span>
                    </div>
                    <div className="card-price">${product.price}</div>
                </div>
            </Link>
        </motion.div>
    );
});

export default ProductCard;

