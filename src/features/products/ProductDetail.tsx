import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProductById, fetchProducts, clearSelectedProduct } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import { ShoppingCart, Check, ShieldCheck, Truck, RefreshCw, Star, ChevronRight, AlertCircle } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { useToast } from '../../context/ToastContext';
import { Product, ProductParams } from '../../types';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams<ProductParams>();
    const dispatch = useAppDispatch();
    const { addToast } = useToast();
    const { selectedProduct, products, loading, error } = useAppSelector((state) => state.products);
    const [activeImage, setActiveImage] = useState(0);

    const isValidId = useMemo(() => {
        if (!id) return false;
        const num = parseInt(id);
        return !isNaN(num) && num > 0;
    }, [id]);

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
        dispatch(addToCart(product));
        addToast(`Added ${product.title} to your cart`, 'success');
    };

    if (!isValidId && id) {
        return (
            <div className="container">
                <div className="error-message glass animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <AlertCircle size={64} style={{ color: 'var(--accent-red)', marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Invalid Selection</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The product you are looking for does not exist in our collections.</p>
                    <Link to="/" className="premium-btn">
                        Return to Collections
                    </Link>
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
                        <div className="skeleton" style={{ height: '150px', width: '100%' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error-message glass animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <AlertCircle size={64} style={{ color: 'var(--accent-red)', marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
                    <Link to="/" className="premium-btn">Return to Shop</Link>
                </div>
            </div>
        );
    }

    if (!selectedProduct) return null;

    // Derived state - safe since selectedProduct is guaranteed here
    const images: string[] = useMemo(() =>
        selectedProduct.images.map(img => img.replace(/[\[\]"]/g, '')),
        [selectedProduct.images]
    );

    const relatedProducts: Product[] = useMemo(() =>
        products
            .filter(p => p.category.id === selectedProduct.category.id && p.id !== selectedProduct.id)
            .slice(0, 4),
        [products, selectedProduct]
    );

    return (
        <div className="product-detail-page animate-fade-in">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight size={14} />
                    <span className="category-crumb">{selectedProduct.category.name}</span>
                    <ChevronRight size={14} />
                    <span className="current-crumb">{selectedProduct.title}</span>
                </nav>

                <div className="product-detail-grid">
                    <div className="product-visuals">
                        <div className="main-image-container premium-card group">
                            <img
                                src={images[activeImage]}
                                alt={selectedProduct.title}
                                className="main-detail-image"
                            />
                            <div className="zoom-hint">Hover to Zoom</div>
                        </div>
                        <div className="image-navigation">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`thumb-nav-btn ${activeImage === idx ? 'active' : ''}`}
                                    onClick={() => setActiveImage(idx)}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="product-info-panel">
                        <div className="info-header">
                            <span className="info-category badge glass">{selectedProduct.category.name || 'Category'}</span>
                            <div className="rating">
                                <Star size={16} fill="currentColor" className="star-icon" />
                                <Star size={16} fill="currentColor" className="star-icon" />
                                <Star size={16} fill="currentColor" className="star-icon" />
                                <Star size={16} fill="currentColor" className="star-icon" />
                                <Star size={16} className="star-icon" />
                                <span>(1,240 Reviews)</span>
                            </div>
                        </div>

                        <h1 className="detail-title">{selectedProduct.title}</h1>

                        <div className="detail-price-wrapper">
                            <span className="detail-price">${selectedProduct.price}</span>
                            <div className="inventory-status">
                                <div className="status-dot success"></div>
                                <span>In Stock & Ready to Ship</span>
                            </div>
                        </div>

                        <div className="detail-description-box">
                            <h4 className="section-subtitle">Exquisite Description</h4>
                            <p className="detail-description">{selectedProduct.description}</p>
                        </div>

                        <div className="action-selection">
                            <button
                                className="premium-btn add-to-bag-btn"
                                onClick={() => handleAddToCart(selectedProduct)}
                            >
                                <ShoppingCart size={22} />
                                Add to Shopping Bag
                            </button>
                        </div>

                        <div className="service-guarantees grid">
                            <div className="guide-item">
                                <Truck size={20} className="guide-icon" />
                                <div>
                                    <strong>Express Delivery</strong>
                                    <span>Complimentary on orders over $250</span>
                                </div>
                            </div>
                            <div className="guide-item">
                                <RefreshCw size={20} className="guide-icon" />
                                <div>
                                    <strong>Conscious Returns</strong>
                                    <span>30-day effortless exchange policy</span>
                                </div>
                            </div>
                            <div className="guide-item">
                                <ShieldCheck size={20} className="guide-icon" />
                                <div>
                                    <strong>Secure Acquisition</strong>
                                    <span>Encrypted payment processing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="related-products-section">
                        <h3 className="section-title small">You May Also Appreciate</h3>
                        <div className="products-grid">
                            {relatedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
