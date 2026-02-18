import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { ShoppingCart, Store, User, Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { totalQuantity } = useAppSelector((state) => state.cart);
    const { isAuthenticated } = useAppSelector((state) => state.user);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="navbar glass">
            <div className="container navbar-content">
                <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
                    <div className="logo-wrapper">
                        <Store size={24} />
                    </div>
                    <span>Luxe<span>Commerce</span></span>
                </Link>

                <div className="navbar-links desktop-only">
                    <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                        Shop
                    </Link>
                    <Link to="/cart" className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}>
                        <ShoppingCart size={20} />
                        Cart
                        {totalQuantity > 0 && <span key={totalQuantity} className="cart-badge animate-pop">{totalQuantity}</span>}
                    </Link>
                    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <div className="nav-user">
                        <User size={18} />
                        <span className="user-status">{isAuthenticated ? 'Account' : 'Login'}</span>
                    </div>
                </div>

                { }
                <button
                    className="mobile-menu-btn mobile-only"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            { }
            <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-sidebar-content">
                    <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                        Shop
                    </Link>
                    <Link to="/cart" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                        Cart ({totalQuantity})
                    </Link>
                    <div className="mobile-nav-link">
                        {isAuthenticated ? 'My Account' : 'Login / Register'}
                    </div>
                </div>
            </div>
            {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </nav>
    );
};

export default Navbar;

