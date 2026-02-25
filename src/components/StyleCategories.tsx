import './StyleCategories.css';

const categories = [
    { title: 'Casual', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop', className: 'card-small' },
    { title: 'Formal', image: 'https://images.unsplash.com/photo-1594932224011-042041c5545c?q=80&w=2080&auto=format&fit=crop', className: 'card-large' },
    { title: 'Party', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2070&auto=format&fit=crop', className: 'card-large' },
    { title: 'Gym', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop', className: 'card-small' },
];

const StyleCategories = () => {
    return (
        <section className="style-categories">
            <div className="container style-container">
                <h2 className="section-title-alt">BROWSE BY DRESS STYLE</h2>
                <div className="categories-grid">
                    {categories.map((cat, idx) => (
                        <div key={idx} className={`style-card ${cat.className}`}>
                            <span className="style-title">{cat.title}</span>
                            <img src={cat.image} alt={cat.title} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StyleCategories;
