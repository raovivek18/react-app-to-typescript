import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
    containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    icon,
    className = '',
    containerClassName = '',
    id,
    ...props
}, ref) => {
    const inputId = id || `input-${props.name || Math.random().toString(36).slice(2, 11)}`;

    return (
        <div className={`form-group ${containerClassName}`}>
            {label && <label htmlFor={inputId}>{label}</label>}
            <div className={`input-with-icon ${icon ? 'has-icon' : ''}`}>
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    id={inputId}
                    ref={ref}
                    className={`${className} ${error ? 'error' : ''}`}
                    {...props}
                />
            </div>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
