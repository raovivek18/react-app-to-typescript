import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import '../components/ToastContainer.css';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
    closing?: boolean;
}

interface ToastContextType {
    addToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.map(t => t.id === id ? { ...t, closing: true } : t));
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 300); // Wait for animation
    }, []);

    const addToast = useCallback((message: string, type: ToastType = 'info', duration: number = 3000) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);

        if (duration) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast-container">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast ${toast.type} ${toast.closing ? 'closing' : ''}`} role="alert">
                        <div className="toast-icon">
                            {toast.type === 'success' && <CheckCircle size={20} color="var(--success)" />}
                            {toast.type === 'error' && <AlertCircle size={20} color="var(--error)" />}
                            {toast.type === 'info' && <Info size={20} color="var(--primary)" />}
                        </div>
                        <div className="toast-message">{toast.message}</div>
                        <button className="toast-close" onClick={() => removeToast(toast.id)} aria-label="Close">
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
