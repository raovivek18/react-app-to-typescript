import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCart, removeFromCart } from './cartSlice';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, X, AlertTriangle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem as ICartItem } from '../../types';
import './CartPage.css';

const CartPage = () => {
    const { cartItems, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const { addToast } = useToast();

    const [itemToDelete, setItemToDelete] = useState<ICartItem | null>(null);

    const handleRemoveRequest = (item: ICartItem) => {
        setItemToDelete(item);
    };

    const confirmRemove = () => {
        if (itemToDelete) {
            dispatch(removeFromCart(itemToDelete.id));
            addToast(`${itemToDelete.title} removed from bag`, 'info');
            setItemToDelete(null);
        }
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your entire bag?')) {
            dispatch(clearCart());
            addToast('Shopping bag cleared', 'info');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-container container animate-fade-in">
                <div className="empty-shadow"></div>
                <div className="empty-cart-content">
                    <div className="icon-blob">
                        <ShoppingBag size={64} className="empty-icon" />
                    </div>
                    <h2>Your Shopping Bag spans the horizon...</h2>
                    <p>It seems you haven't discovered your next favorite piece yet.</p>
                    <Link to="/" className="premium-btn">
                        <ArrowLeft size={18} /> Explore Collections
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page animate-fade-in container">
            <div className="cart-header">
                <div>
                    <h1>Shopping Bag</h1>
                    <p className="cart-subtitle">Review your selected creations ({totalQuantity} items)</p>
                </div>
                <button onClick={handleClearCart} className="clear-cart-btn">
                    <Trash2 size={16} /> Clear All
                </button>
            </div>

            <div className="cart-grid">
                <div className="cart-items-list">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} onRemove={handleRemoveRequest} />
                    ))}

                    <div className="continue-shopping-row">
                        <Link to="/" className="text-link">
                            <ArrowLeft size={16} /> Continue Shopping
                        </Link>
                    </div>
                </div>

                <div className="cart-summary-panel">
                    <div className="summary-card glass">
                        <h3>Order Summary</h3>
                        <div className="summary-body">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Concierge Shipping</span>
                                <span className="free-tag">Free</span>
                            </div>
                            <div className="summary-row">
                                <span>Estimated Duties</span>
                                <span>Included</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total-row">
                                <span>Total Amount</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="premium-btn checkout-btn">
                            Begin Checkout <ArrowRight size={20} />
                        </Link>

                        <div className="payment-trust">
                            <p>Guaranteed secure checkout with SSL encryption</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {itemToDelete && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="modal-content glass"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="modal-header">
                                <AlertTriangle size={24} className="warning-icon" />
                                <h3>Remove Item?</h3>
                            </div>
                            <p>Are you sure you want to remove <strong>{itemToDelete.title}</strong> from your shopping bag?</p>
                            <div className="modal-actions">
                                <button className="premium-btn outline small" onClick={() => setItemToDelete(null)}>Cancel</button>
                                <button className="premium-btn danger small" onClick={confirmRemove}>Remove</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CartPage;

