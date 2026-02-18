import { Store, Github, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <Store size={32} />
                        <span>LuxeCommerce</span>
                    </div>
                    <p className="brand-desc">
                        Redefining the standards of premium digital commerce with exquisite collections and unparalleled craftsmanship since 2026.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Github"><Github size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Collections</h4>
                    <ul>
                        <li><a href="#">Electronic Mastery</a></li>
                        <li><a href="#">Fine Jewelry</a></li>
                        <li><a href="#">Men's Elegance</a></li>
                        <li><a href="#">Women's Couture</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Concierge</h4>
                    <ul>
                        <li><a href="#">Track Order</a></li>
                        <li><a href="#">Returns & Exchanges</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <div className="contact-item">
                        <MapPin size={18} />
                        <span>123 Excellence Way, Design District, NY</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} />
                        <span>+1 (555) 000- luxury</span>
                    </div>
                    <div className="contact-item">
                        <Mail size={18} />
                        <span>concierge@luxecommerce.com</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container bottom-content">
                    <p>&copy; 2026 LuxeCommerce. All rights reserved.</p>
                    <div className="bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
