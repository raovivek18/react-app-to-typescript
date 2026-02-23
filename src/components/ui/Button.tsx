import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'secondary': return 'secondary-btn';
            case 'outline': return 'premium-btn outline';
            case 'danger': return 'premium-btn danger';
            case 'ghost': return 'ghost-btn';
            case 'primary':
            default: return 'premium-btn';
        }
    };

    const getSizeClass = () => {
        switch (size) {
            case 'small': return 'small';
            case 'large': return 'large';
            case 'medium':
            default: return '';
        }
    };

    return (
        <motion.button
            className={`${getVariantClass()} ${getSizeClass()} ${className}`}
            disabled={disabled || isLoading}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {isLoading ? (
                <span className="button-loader"></span>
            ) : (
                <>
                    {leftIcon && <span className="button-icon-left">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="button-icon-right">{rightIcon}</span>}
                </>
            )}
        </motion.button>
    );
};

export default Button;
