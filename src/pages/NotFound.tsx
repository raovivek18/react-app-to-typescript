import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import '../styles/NotFound.css';

const NotFound = () => {
    return (
        <motion.div
            className="not-found-page container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="not-found-content">
                <motion.h1
                    className="error-code"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    The page you're looking for doesn't exist or has been moved.
                </motion.p>

                <motion.div
                    className="not-found-actions"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/" className="premium-btn">
                        <Home size={20} />
                        Back to Home
                    </Link>
                    <Link to="/" className="premium-btn outline">
                        <Search size={20} />
                        Browse Products
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default NotFound;
