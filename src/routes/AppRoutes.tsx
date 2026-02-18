import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import NotFound from '../pages/NotFound';

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.2
        }
    }
};

const AppRoutes = () => {
    const location = useLocation();

    return (
        <Layout>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <HomePage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/product/:id"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <ProductPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <CartPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <CheckoutPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/order-success"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <OrderSuccessPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <NotFound />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </Layout>
    );
};

export default AppRoutes;
