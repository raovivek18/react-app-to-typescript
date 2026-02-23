import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart } from '../features/cart/cartSlice';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { CheckoutFormData } from '../types';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { addToast } = useToast();
    const { cartItems, totalPrice, subtotal, shipping, tax } = useAppSelector(state => state.cart);

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            cardNumber: '',
            expiryDate: '',
            cvv: ''
        }
    });

    const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
        setLoading(true);

        setTimeout(() => {
            const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
            dispatch(clearCart());
            setLoading(false);
            addToast('Order placed successfully!', 'success');
            navigate('/order-success', { state: { orderNumber, formData: data } });
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-section">
                            <h3>Billing Information</h3>
                            <Input
                                label="Full Name"
                                {...register('fullName', { required: 'Full name is required' })}
                                error={errors.fullName?.message}
                            />

                            <div className="form-row">
                                <Input
                                    label="Email"
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Valid email is required'
                                        }
                                    })}
                                    error={errors.email?.message}
                                />
                                <Input
                                    label="Phone"
                                    type="tel"
                                    {...register('phone', { required: 'Phone number is required' })}
                                    error={errors.phone?.message}
                                />
                            </div>

                            <Input
                                label="Address"
                                {...register('address', { required: 'Address is required' })}
                                error={errors.address?.message}
                            />

                            <div className="form-row">
                                <Input
                                    label="City"
                                    {...register('city', { required: 'City is required' })}
                                    error={errors.city?.message}
                                />
                                <Input
                                    label="Postal Code"
                                    {...register('postalCode', { required: 'Postal code is required' })}
                                    error={errors.postalCode?.message}
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Payment Information</h3>
                            <Input
                                label="Card Number"
                                placeholder="1234 5678 9012 3456"
                                maxLength={16}
                                {...register('cardNumber', {
                                    required: 'Card number is required',
                                    minLength: { value: 16, message: 'Valid 16-digit card number is required' },
                                    maxLength: { value: 16, message: 'Valid 16-digit card number is required' }
                                })}
                                error={errors.cardNumber?.message}
                                icon={<CreditCard size={20} />}
                            />

                            <div className="form-row">
                                <Input
                                    label="Expiry Date"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    {...register('expiryDate', { required: 'Expiry date is required' })}
                                    error={errors.expiryDate?.message}
                                />
                                <Input
                                    label="CVV"
                                    placeholder="123"
                                    maxLength={3}
                                    {...register('cvv', {
                                        required: 'CVV is required',
                                        minLength: { value: 3, message: 'Valid 3-digit CVV is required' }
                                    })}
                                    error={errors.cvv?.message}
                                    icon={<Lock size={18} />}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="checkout-submit-btn"
                            isLoading={loading}
                            leftIcon={!loading && <Lock size={20} />}
                        >
                            Place Order ${totalPrice.toFixed(2)}
                        </Button>
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
                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
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
