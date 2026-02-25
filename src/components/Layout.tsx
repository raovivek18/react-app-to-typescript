import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="app-layout">
            <AnnouncementBar />
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

