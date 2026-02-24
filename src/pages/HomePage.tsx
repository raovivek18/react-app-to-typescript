import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import Hero from '../components/Hero';
import ProductsList from '../features/products/ProductsList';
import { ChevronDown, X, Filter, ArrowUpDown } from 'lucide-react';
import '../styles/HomePage.css';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);

    const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | ''>(''); // 'price-asc', 'price-desc'
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Extract unique categories
    const categories = useMemo(() => {
        if (!products) return [];
        const cats = products.map(p => p.category.name).filter(Boolean);
        return [...new Set(cats)];
    }, [products]);

    // Filter and Sort
    const filteredProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        let result = [...products];

        if (selectedCategory) {
            result = result.filter(p => p.category.name === selectedCategory);
        }

        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, selectedCategory, sortBy]);

    const clearFilters = () => {
        setSelectedCategory('');
        setSortBy('');
    };

    return (
        <div className="home-page animate-fade-in">
            <Hero />

            <main className="container">
                <section className="shop-section">
                    <div className="section-header glass" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
                            <div className="header-info">
                                <h2 className="section-title">The Master Collection</h2>
                                <p className="section-subtitle">Exquisite essentials meticulously crafted for the modern individual.</p>
                            </div>

                            <div className="controls-wrapper" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {/* Category Filter */}
                                <div className="custom-select-wrapper">
                                    <div className="custom-select" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                                        <Filter size={16} />
                                        <span>{selectedCategory || 'All Categories'}</span>
                                        <ChevronDown size={16} />
                                    </div>
                                    {isFilterOpen && (
                                        <div className="custom-select-options glass">
                                            <div
                                                className={`option ${selectedCategory === '' ? 'selected' : ''}`}
                                                onClick={() => { setSelectedCategory(''); setIsFilterOpen(false); }}
                                            >
                                                All Categories
                                            </div>
                                            {categories.map((cat: string) => (
                                                <div
                                                    key={cat}
                                                    className={`option ${selectedCategory === cat ? 'selected' : ''}`}
                                                    onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                                                >
                                                    {cat}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Sort Options */}
                                <div className="sort-buttons">
                                    <button
                                        className={`premium-btn outline small ${sortBy === 'price-asc' ? 'active' : ''}`}
                                        onClick={() => setSortBy('price-asc')}
                                        title="Price Low to High"
                                    >
                                        Price <ArrowUpDown size={14} className="rotate-180" />
                                    </button>
                                    <button
                                        className={`premium-btn outline small ${sortBy === 'price-desc' ? 'active' : ''}`}
                                        onClick={() => setSortBy('price-desc')}
                                        title="Price High to Low"
                                    >
                                        Price <ArrowUpDown size={14} />
                                    </button>
                                </div>

                                {(selectedCategory || sortBy) && (
                                    <button className="clear-filter-btn" onClick={clearFilters}>
                                        <X size={16} /> Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <ProductsList products={filteredProducts} loading={loading} error={error} />
                </section>
            </main>
        </div>
    );
};

export default HomePage;

