import React, { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
    containerClassName?: string;
}

const Input = ({
    label,
    error,
    icon,
    className = '',
    containerClassName = '',
    id,
    ...props
}: InputProps) => {
    const inputId = id || `input-${props.name || Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`form-group ${containerClassName}`}>
            {label && <label htmlFor={inputId}>{label}</label>}
            <div className={`input-with-icon ${icon ? 'has-icon' : ''}`}>
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    id={inputId}
                    className={`${className} ${error ? 'error' : ''}`}
                    {...props}
                />
            </div>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};

export default Input;
