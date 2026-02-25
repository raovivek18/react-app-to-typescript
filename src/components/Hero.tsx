import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <div className="hero-content animate-fade-in">
                    <h1 className="hero-title">
                        FIND CLOTHES THAT MATCH YOUR STYLE PERFECTLY
                    </h1>
                    <p className="hero-subtitle">
                        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                    </p>
                    <div className="hero-actions">
                        <button className="shop-now-btn">
                            Shop Now
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">200+</span>
                            <span className="stat-label">International Brands</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">2,000+</span>
                            <span className="stat-label">High-Quality Products</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">30,000+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image-container animate-fade-in">
                    <div className="image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
                            alt="Fashion Model"
                            className="hero-img"
                        />
                        <div className="star star-small">✦</div>
                        <div className="star star-large">✦</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
