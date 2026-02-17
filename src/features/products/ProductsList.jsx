import ProductCard from '../../components/ProductCard';
import './ProductsList.css';

const ProductsList = ({ products, loading, error }) => {

    if (loading && (!products || products.length === 0)) {
        return (
            <div className="products-grid">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="product-card premium-card skeleton">
                        <div className="card-image-wrapper skeleton" style={{ height: '300px' }}></div>
                        <div className="card-content">
                            <div className="skeleton" style={{ height: '20px', width: '80%', marginBottom: '10px' }}></div>
                            <div className="skeleton" style={{ height: '20px', width: '40%' }}></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!products || products.length === 0) {
        return (
            <div className="empty-state">
                <p>No products found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="products-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductsList;
