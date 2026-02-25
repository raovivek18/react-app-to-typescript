import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeFromCart } from './cartSlice';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import { ArrowRight, ChevronRight, Tag } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import './CartPage.css';

const CartPage = () => {
    const { cartItems, subtotal } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const { addToast } = useToast();

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
        addToast('Item removed from cart', 'info');
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page animate-fade-in container">
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight size={14} />
                    <span className="current-crumb">Cart</span>
                </nav>
                <div className="empty-cart-message">
                    <h1>Your cart is empty</h1>
                    <Link to="/" className="add-to-cart-btn-full" style={{ display: 'inline-block', width: 'auto', padding: '0 40px', marginTop: '20px', lineHeight: '52px', textAlign: 'center', textDecoration: 'none', background: '#000', color: '#fff', borderRadius: '62px' }}>Go to Shop</Link>
                </div>
            </div>
        );
    }

    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const finalTotal = subtotal - discount + deliveryFee;

    return (
        <div className="cart-page animate-fade-in container">
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                <ChevronRight size={14} />
                <span className="current-crumb">Cart</span>
            </nav>

            <h1 className="page-title">Your cart</h1>

            <div className="cart-layout">
                <div className="cart-items-container">
                    {cartItems.map((item, idx) => (
                        <div key={item.id}>
                            <CartItem item={item} onRemove={() => handleRemove(item.id)} />
                            {idx < cartItems.length - 1 && <hr className="item-divider" />}
                        </div>
                    ))}
                </div>

                <div className="cart-summary-container">
                    <div className="order-summary-card">
                        <h2>Order Summary</h2>
                        <div className="summary-details">
                            <div className="summary-line">
                                <span className="label">Subtotal</span>
                                <span className="value">${subtotal.toFixed(0)}</span>
                            </div>
                            <div className="summary-line">
                                <span className="label">Discount (-20%)</span>
                                <span className="value discount">-${discount.toFixed(0)}</span>
                            </div>
                            <div className="summary-line">
                                <span className="label">Delivery Fee</span>
                                <span className="value">${deliveryFee}</span>
                            </div>
                            <hr className="summary-divider" />
                            <div className="summary-line total">
                                <span className="label">Total</span>
                                <span className="value">${finalTotal.toFixed(0)}</span>
                            </div>
                        </div>

                        <div className="promo-section">
                            <div className="promo-input-wrapper">
                                <Tag size={20} className="tag-icon" />
                                <input type="text" placeholder="Add promo code" />
                            </div>
                            <button className="apply-btn">Apply</button>
                        </div>

                        <Link to="/checkout" className="checkout-btn-full">
                            Go to Checkout <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
