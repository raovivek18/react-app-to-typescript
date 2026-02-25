import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import Hero from '../components/Hero';
import BrandBar from '../components/BrandBar';
import ProductsList from '../features/products/ProductsList';
import StyleCategories from '../components/StyleCategories';
import '../styles/HomePage.css';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const newArrivals = useMemo(() => products.slice(0, 4), [products]);
    const topSelling = useMemo(() => products.slice(4, 12), [products]);

    return (
        <div className="home-page animate-fade-in">
            <Hero />
            <BrandBar />

            <main className="main-content">
                <section className="product-section container">
                    <h2 className="section-title-alt">NEW ARRIVALS</h2>
                    <ProductsList products={newArrivals} loading={loading} error={error} />
                    <div className="view-all-wrapper">
                        <button className="view-all-btn">View All</button>
                    </div>
                </section>

                <hr className="section-divider container" />

                <section className="product-section container">
                    <h2 className="section-title-alt">TOP SELLING</h2>
                    <ProductsList products={topSelling} loading={loading} error={error} />
                    <div className="view-all-wrapper">
                        <button className="view-all-btn">View All</button>
                    </div>
                </section>

                <StyleCategories />
            </main>
        </div>
    );
};

export default HomePage;

