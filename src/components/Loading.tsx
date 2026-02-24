

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', width: '100%' }}>
            <div className="loading-spinner"></div>
            <style>{`
                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(0, 0, 0, 0.1);
                    border-radius: 50%;
                    border-top-color: #000;
                    animation: spin 1s ease-in-out infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Loading;
