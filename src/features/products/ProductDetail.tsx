import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProductById, fetchProducts, clearSelectedProduct } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import { ChevronRight, AlertCircle, Plus, Minus, Check } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { useToast } from '../../context/ToastContext';
import { Product } from '../../types';
import './ProductDetail.css';

import { isValidProductParams } from '../../utils/typeGuards';

import { motion } from 'framer-motion';

const ProductDetail = () => {
    const params = useParams();
    const isValidId = isValidProductParams(params);
    const { id } = params;
    const dispatch = useAppDispatch();
    const { addToast } = useToast();
    const { selectedProduct, products, loading, error } = useAppSelector((state) => state.products);

    const [activeImage, setActiveImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState('Large');
    const [quantity, setQuantity] = useState(1);

    const colors = ['#4F4631', '#314F4A', '#31344F'];
    const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

    useEffect(() => {
        window.scrollTo(0, 0);

        if (id && isValidId) {
            dispatch(fetchProductById(id));
        }

        if (products.length === 0) {
            dispatch(fetchProducts());
        }

        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [dispatch, id, isValidId, products.length]);

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({ ...product }));
        addToast(`Added ${quantity} ${product.title} to your cart`, 'success');
    };

    if (!isValidId || (!loading && !selectedProduct && !error)) {
        return (
            <div className="container">
                <div className="error-message animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <AlertCircle size={64} style={{ color: '#000', marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Product Not Found</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The product you are looking for does not exist.</p>
                    <Link to="/" className="view-all-btn">Return to Shop</Link>
                </div>
            </div>
        );
    }

    if (loading && !selectedProduct) {
        return (
            <div className="container">
                <div className="product-detail-grid">
                    <div className="product-visuals skeleton" style={{ height: '500px' }}></div>
                    <div className="product-info-panel">
                        <div className="skeleton" style={{ height: '30px', width: '30%', marginBottom: '20px' }}></div>
                        <div className="skeleton" style={{ height: '50px', width: '80%', marginBottom: '30px' }}></div>
                        <div className="skeleton" style={{ height: '40px', width: '40%', marginBottom: '40px' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error-message animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <AlertCircle size={64} style={{ color: '#000', marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
                    <Link to="/" className="view-all-btn">Return to Shop</Link>
                </div>
            </div>
        );
    }

    // Derived state - safe since selectedProduct is guaranteed here
    const images: string[] = selectedProduct ? selectedProduct.images.map(img => img.replace(/[\[\]"]/g, '')) : [];

    const relatedProducts: Product[] = selectedProduct ? products
        .filter(p => p.category.id === selectedProduct.category.id && p.id !== selectedProduct.id)
        .slice(0, 4) : [];

    return (
        <div className="product-detail-page">
            <div className="container">
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/">Shop</Link>
                    <ChevronRight size={14} />
                    <Link to="/">{selectedProduct?.category?.name || 'Category'}</Link>
                    <ChevronRight size={14} />
                    <span className="current-crumb">{selectedProduct?.title}</span>
                </nav>

                <div className="product-detail-grid">
                    <motion.div
                        className="product-visuals"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="thumbnails-vertical">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`thumb-btn ${activeImage === idx ? 'active' : ''}`}
                                    onClick={() => setActiveImage(idx)}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                                </button>
                            ))}
                        </div>
                        <div className="main-image-panel">
                            <motion.img
                                key={activeImage}
                                src={images[activeImage]}
                                alt={selectedProduct?.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>

                    <div className="product-info-panel">
                        <motion.h1
                            className="product-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {selectedProduct?.title}
                        </motion.h1>

                        <motion.div
                            className="product-price"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            ${selectedProduct?.price}
                        </motion.div>

                        <motion.p
                            className="product-description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {selectedProduct?.description}
                        </motion.p>

                        <motion.div
                            className="product-features"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <p className="features-title">Key Features:</p>
                            <ul>
                                <li><Check size={16} /> Premium materials for all-day comfort</li>
                                <li><Check size={16} /> High-quality craftsmanship for long-lasting durability</li>
                                <li><Check size={16} /> Classic design for a timeless fit</li>
                                <li><Check size={16} /> Available in multiple colors and sizes</li>
                                <li><Check size={16} /> Ethical and sustainable production</li>
                            </ul>
                        </motion.div>

                        <hr className="divider" />

                        <motion.div
                            className="selection-section"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <p className="section-label">Select Colors</p>
                            <div className="colors-grid">
                                {colors.map((color, idx) => (
                                    <button
                                        key={idx}
                                        className={`color-swatch ${selectedColor === idx ? 'active' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(idx)}
                                    >
                                        {selectedColor === idx && <Check size={16} color="#fff" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        <hr className="divider" />

                        <motion.div
                            className="selection-section"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <p className="section-label">Choose Size</p>
                            <div className="sizes-grid">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        <hr className="divider" />

                        <motion.div
                            className="purchase-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={20} /></button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={20} /></button>
                            </div>
                            <motion.button
                                className="add-to-cart-btn-full"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => selectedProduct && handleAddToCart(selectedProduct)}
                            >
                                Add to Cart
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <motion.div
                        className="related-section"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title-alt">YOU MIGHT ALSO LIKE</h2>
                        <div className="products-grid">
                            {relatedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
