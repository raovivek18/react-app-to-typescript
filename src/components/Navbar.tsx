import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { ShoppingCart, User, Menu, X, Search, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { totalQuantity } = useAppSelector((state) => state.cart);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <button
                    className="mobile-menu-btn mobile-only"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <Menu size={24} />
                </button>

                <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
                    FAKESTORE
                </Link>

                <div className="navbar-links desktop-only">
                    <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'active' : ''}`}>
                        Shop <ChevronDown size={14} />
                    </Link>
                    <Link to="#" className="nav-link">On Sale</Link>
                    <Link to="#" className="nav-link">New Arrivals</Link>
                    <Link to="#" className="nav-link">Brands</Link>
                </div>

                <div className="navbar-search desktop-only">
                    <div className="search-wrapper">
                        <Search size={20} className="search-icon" />
                        <input type="text" placeholder="Search for products..." />
                    </div>
                </div>

                <div className="navbar-actions">
                    <button className="search-btn mobile-only">
                        <Search size={24} />
                    </button>
                    <Link to="/cart" className="action-link cart-link">
                        <ShoppingCart size={24} />
                        {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                    </Link>
                    <div className="action-link">
                        <User size={24} />
                    </div>
                </div>
            </div>

            <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-sidebar-header">
                    <span className="navbar-logo">FAKESTORE</span>
                    <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
                </div>
                <div className="mobile-sidebar-content">
                    <Link to="/shop" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                    <Link to="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>On Sale</Link>
                    <Link to="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
                    <Link to="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Brands</Link>
                </div>
            </div>
            {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </nav>
    );
};

export default Navbar;

