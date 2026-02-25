import { useState } from 'react';
import './AnnouncementBar.css';

const AnnouncementBar = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="announcement-bar">
            <div className="container">
                <p>Sign up and get 20% off to your first order. <a href="#">Sign Up Now</a></p>
                <button
                    className="close-announcement"
                    onClick={() => setIsVisible(false)}
                    aria-label="Close announcement"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default AnnouncementBar;
