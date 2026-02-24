import { ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: 'small' | 'medium' | 'large';
    showCloseButton?: boolean;
}

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'medium',
    showCloseButton = true
}: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={`modal-content glass ${size}`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e: MouseEvent) => e.stopPropagation()}
                    >
                        {(title || showCloseButton) && (
                            <div className="modal-header">
                                {title && <h3>{title}</h3>}
                                {showCloseButton && (
                                    <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="modal-body">
                            {children}
                        </div>

                        {footer && (
                            <div className="modal-footer">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
