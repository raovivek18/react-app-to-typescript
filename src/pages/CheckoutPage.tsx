import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart } from '../features/cart/cartSlice';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import '../styles/CheckoutPage.css';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { addToast } = useToast();
    const { cartItems, totalPrice } = useAppSelector(state => state.cart);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        if (!formData.cardNumber.trim() || formData.cardNumber.length !== 16) newErrors.cardNumber = 'Valid 16-digit card number is required';
        if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv.trim() || formData.cvv.length !== 3) newErrors.cvv = 'Valid 3-digit CVV is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            addToast('Please fix the errors in the form', 'error');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
            dispatch(clearCart());
            setLoading(false);
            addToast('Order placed successfully!', 'success');
            navigate('/order-success', { state: { orderNumber, formData } });
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
                <h2>Your cart is empty</h2>
                <Link to="/" className="premium-btn" style={{ marginTop: '2rem' }}>Continue Shopping</Link>
            </div>
        );
    }

    return (
        <motion.div
            className="checkout-page container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Link to="/cart" className="back-link">
                <ArrowLeft size={18} /> Back to Cart
            </Link>

            <h1 className="checkout-title">Secure Checkout</h1>

            <div className="checkout-grid">
                <div className="checkout-form-section">
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3>Billing Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={errors.firstName ? 'error' : ''}
                                    />
                                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={errors.lastName ? 'error' : ''}
                                    />
                                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-text">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={errors.phone ? 'error' : ''}
                                    />
                                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={errors.address ? 'error' : ''}
                                />
                                {errors.address && <span className="error-text">{errors.address}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={errors.city ? 'error' : ''}
                                    />
                                    {errors.city && <span className="error-text">{errors.city}</span>}
                                </div>
                                <div className="form-group">
                                    <label>ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className={errors.zipCode ? 'error' : ''}
                                    />
                                    {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Payment Information</h3>
                            <div className="form-group">
                                <label>Card Number</label>
                                <div className="input-with-icon">
                                    <CreditCard size={20} />
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={16}
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        className={errors.cardNumber ? 'error' : ''}
                                    />
                                </div>
                                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        className={errors.expiryDate ? 'error' : ''}
                                    />
                                    {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <div className="input-with-icon">
                                        <Lock size={18} />
                                        <input
                                            type="text"
                                            name="cvv"
                                            placeholder="123"
                                            maxLength={3}
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            className={errors.cvv ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="premium-btn checkout-submit-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader className="spinner" size={20} />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Lock size={20} />
                                    Place Order ${totalPrice.toFixed(2)}
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="order-summary-section">
                    <div className="summary-card glass">
                        <h3>Order Summary</h3>
                        <div className="summary-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="summary-item">
                                    <div className="item-details">
                                        <span className="item-name">{item.title}</span>
                                        <span className="item-qty">x{item.quantity}</span>
                                    </div>
                                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span className="total-amount">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CheckoutPage;
