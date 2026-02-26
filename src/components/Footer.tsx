import { Github, Twitter, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="container newsletter-wrapper">
                <div className="newsletter-card">
                    <h2 className="newsletter-title">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
                    <div className="newsletter-form">
                        <div className="input-wrapper">
                            <span className="email-icon">✉</span>
                            <input type="email" placeholder="Enter your email address" />
                        </div>
                        <button className="subscribe-btn">Subscribe to Newsletter</button>
                    </div>
                </div>
            </div>
            <div className="footer-main">
                <div className="container footer-grid">
                    <div className="footer-brand">
                        <h2 className="footer-logo">FAKESTORE</h2>
                        <p className="brand-desc">
                            We have clothes that suit your style and which you're proud to wear. From women to men.
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="Github"><Github size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <div className="footer-links">
                            <h4>COMPANY</h4>
                            <ul>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Works</a></li>
                                <li><a href="#">Career</a></li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h4>HELP</h4>
                            <ul>
                                <li><a href="#">Customer Support</a></li>
                                <li><a href="#">Delivery Details</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h4>FAQ</h4>
                            <ul>
                                <li><a href="#">Account</a></li>
                                <li><a href="#">Manage Deliveries</a></li>
                                <li><a href="#">Orders</a></li>
                                <li><a href="#">Payments</a></li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h4>RESOURCES</h4>
                            <ul>
                                <li><a href="#">Free eBooks</a></li>
                                <li><a href="#">Development Tutorial</a></li>
                                <li><a href="#">How to - Blog</a></li>
                                <li><a href="#">Youtube Playlist</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="container bottom-content">
                        <p>Fakestore © 2000-2023, All Rights Reserved</p>
                        <div className="payment-methods">
                            {/* Visa */}
                            <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-icon">
                                <rect width="46" height="30" rx="5" fill="white" />
                                <path d="M19.14 19.34L21.37 10.66H23.59L21.36 19.34H19.14ZM26.88 10.66C26.03 10.66 25.32 10.95 24.94 11.51L22.12 18.25L24.36 18.25L24.81 17.15H27.53L27.79 18.25L30.01 18.25L28.18 10.66H26.88ZM25.5 15.53L26.17 13.91L26.84 15.53H25.5ZM13.88 10.66L11.75 16.59L11.53 15.42C11.45 14.88 10.97 14.41 10.42 14.15L12.55 19.34H14.77L16.99 10.66H14.77L13.88 10.66ZM9.5 10.66C8.8 10.66 8.28 10.88 7.91 11.43V11.43L7.9 11.45L9.62 19.34H11.84L14.06 10.66H11.84L9.5 10.66Z" fill="#1A1F71" />
                            </svg>
                            {/* Mastercard */}
                            <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-icon">
                                <rect width="46" height="30" rx="5" fill="white" />
                                <circle cx="18.5" cy="15" r="7.5" fill="#EB001B" />
                                <circle cx="27.5" cy="15" r="7.5" fill="#F79E1B" />
                                <path d="M23 15C23 12.35 21.85 9.97 20 8.35C18.15 9.97 17 12.35 17 15C17 17.65 18.15 20.03 20 21.65C21.85 20.03 23 17.65 23 15Z" fill="#FF5F00" />
                            </svg>
                            {/* Paypal */}
                            <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-icon">
                                <rect width="46" height="30" rx="5" fill="white" />
                                <path d="M14.5 10H23.5C27 10 29 11.5 29 14.5C29 17.5 27 19 23.5 19H20.5L19.5 24H15.5L17.5 14H14.5V10Z" fill="#003087" />
                                <path d="M19.5 13H24.5C27 13 28.5 14 28.5 16C28.5 18 27 19 24.5 19H21.5L20.5 24H17.5L19.5 14V13Z" fill="#009CDE" />
                            </svg>
                            {/* Apple Pay */}
                            <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-icon">
                                <rect width="46" height="30" rx="5" fill="white" />
                                <path d="M22.5 12.5C21.5 12.5 20.5 13 20 14C19.5 13 18.5 12.5 17.5 12.5C15.5 12.5 14 14 14 16.5C14 19.5 16.5 22.5 19.5 22.5H20.5C23.5 22.5 26 19.5 26 16.5C26 14 24.5 12.5 22.5 12.5Z" fill="black" />
                            </svg>
                            {/* Google Pay */}
                            <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-icon">
                                <rect width="46" height="30" rx="5" fill="white" />
                                <path d="M13 14H15V16H18V14H20V19H13V14Z" fill="#4285F4" />
                                <path d="M21 14H23V19H21V14Z" fill="#34A853" />
                                <path d="M24 14H26V19H24V14Z" fill="#FBBC05" />
                                <path d="M27 14H29V19H27V14Z" fill="#EA4335" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
