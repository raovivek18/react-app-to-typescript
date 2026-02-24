import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home } from 'lucide-react';
import '../styles/OrderSuccessPage.css';

import { CheckoutFormData } from '../types';

interface LocationState {
    orderNumber: string;
    formData: CheckoutFormData;
}

const OrderSuccessPage = () => {
    const location = useLocation();
    const state = location.state as LocationState | null;

    useEffect(() => {
        if (!state?.orderNumber) {
            window.location.href = '/';
        }
    }, [state]);

    if (!state || !state.orderNumber) return null;

    const { orderNumber, formData } = state;

    return (
        <motion.div
            className="order-success-page container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="success-content">
                <motion.div
                    className="success-icon-wrapper"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200
                    }}
                >
                    <CheckCircle size={80} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Order Placed Successfully!
                </motion.h1>

                <motion.p
                    className="success-message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Thank you for your purchase. Your order has been received and is being processed.
                </motion.p>

                <motion.div
                    className="order-details glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="detail-row">
                        <span className="detail-label">Order Number</span>
                        <span className="detail-value order-number">{orderNumber}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{formData.email}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Delivery Address</span>
                        <span className="detail-value">{formData.address}, {formData.city} {formData.postalCode}</span>
                    </div>
                </motion.div>

                <motion.div
                    className="success-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link to="/" className="premium-btn">
                        <Home size={20} />
                        Continue Shopping
                    </Link>
                    <button className="premium-btn outline">
                        <Package size={20} />
                        Track Order
                    </button>
                </motion.div>

                <motion.div
                    className="delivery-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <p>📦 Estimated delivery: 3-5 business days</p>
                    <p>📧 A confirmation email has been sent to {formData.email}</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default OrderSuccessPage;
