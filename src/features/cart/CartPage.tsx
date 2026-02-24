import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCart, removeFromCart } from './cartSlice';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

import { CartItem as ICartItem } from '../../types';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import './CartPage.css';

const CartPage = () => {
    const { cartItems, totalPrice, subtotal, shipping, tax, totalQuantity } = useAppSelector((state) => state.cart);
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
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className={shipping === 0 ? 'free-tag' : ''}>
                                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
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
            <Modal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                title="Remove Item?"
                size="small"
                footer={
                    <div className="modal-actions">
                        <Button
                            variant="primary"
                            className="outline small"
                            onClick={() => setItemToDelete(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            className="small"
                            onClick={confirmRemove}
                        >
                            Remove
                        </Button>
                    </div>
                }
            >
                {itemToDelete && (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <AlertTriangle size={24} className="warning-icon" />
                        <p style={{ margin: 0 }}>Are you sure you want to remove <strong>{itemToDelete.title}</strong> from your shopping bag?</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CartPage;

