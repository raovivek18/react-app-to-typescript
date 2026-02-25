import './AnnouncementBar.css';

const AnnouncementBar = () => {
    return (
        <div className="announcement-bar">
            <div className="container">
                <p>Sign up and get 20% off to your first order. <a href="#">Sign Up Now</a></p>
                <button className="close-announcement">×</button>
            </div>
        </div>
    );
};

export default AnnouncementBar;
