import { ArrowRight, ShoppingBag } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="gradient-sphere sphere-1"></div>
                <div className="gradient-sphere sphere-2"></div>
            </div>

            <div className="container hero-container">
                <div className="hero-content animate-fade-in">
                    <div className="hero-badge">New Collection 2026</div>
                    <h1 className="hero-title">
                        Define Your <span className="highlight">Signature</span> Style
                    </h1>
                    <p className="hero-subtitle">
                        Experience the pinnacle of craftsmanship with our curated selection of ultra-premium essentials. Designed for those who demand excellence in every detail.
                    </p>
                    <div className="hero-actions">
                        <button className="premium-btn shop-btn">
                            Explore Collection <ArrowRight size={20} />
                        </button>
                        <button className="secondary-btn">
                            <ShoppingBag size={20} /> View Deals
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">50k+</span>
                            <span className="stat-label">Happy Clients</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">2k+</span>
                            <span className="stat-label">Luxury Items</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">24/7</span>
                            <span className="stat-label">Expert Support</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image-container animate-fade-in">
                    <div className="image-card">
                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop"
                            alt="Premium Product"
                            className="floating-img"
                        />
                        <div className="glass-card info-floater">
                            <div className="floater-content">
                                <div className="floater-title">Premium Quality</div>
                                <div className="floater-sub">Crafted with precision</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
