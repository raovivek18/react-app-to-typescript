import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import Hero from '../components/Hero';
import BrandBar from '../components/BrandBar';
import ProductsList from '../features/products/ProductsList';
import StyleCategories from '../components/StyleCategories';
import '../styles/HomePage.css';

import { motion } from 'framer-motion';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const newArrivals = useMemo(() => products.slice(0, 4), [products]);
    const topSelling = useMemo(() => products.slice(4, 12), [products]);

    return (
        <div className="home-page">
            <Hero />
            <BrandBar />

            <main className="main-content">
                <motion.section
                    className="product-section container"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title-alt">NEW ARRIVALS</h2>
                    <ProductsList products={newArrivals} loading={loading} error={error} />
                    <div className="view-all-wrapper">
                        <Link to="/shop" className="view-all-btn">View All</Link>
                    </div>
                </motion.section>

                <hr className="section-divider container" />

                <motion.section
                    className="product-section container"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title-alt">CASUAL</h2>
                    <ProductsList products={topSelling} loading={loading} error={error} />
                    <div className="view-all-wrapper">
                        <button className="view-all-btn">View All</button>
                    </div>
                </motion.section>

                <StyleCategories />
            </main>
        </div>
    );
};


export default HomePage;

