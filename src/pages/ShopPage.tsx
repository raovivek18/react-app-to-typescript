import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductsList from '../features/products/ProductsList';
import './ShopPage.css';

const ShopPage = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="shop-page container">
            <h1 className="page-title">All Products</h1>
            <ProductsList products={products} loading={loading} error={error} />
        </div>
    );
};

export default ShopPage;
