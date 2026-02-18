import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>Something went wrong.</h1>
                    <p style={{ color: '#666', marginBottom: '1rem' }}>We apologize for the inconvenience.</p>
                    <details style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem', textAlign: 'left', maxWidth: '600px', margin: '0 auto 1rem', background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
                        {this.state.error && this.state.error.toString()}
                    </details>
                    <Link to="/" style={{ padding: '0.75rem 1.5rem', background: '#000', color: '#fff', textDecoration: 'none', borderRadius: '4px' }} onClick={() => this.setState({ hasError: false })}>
                        Go back to Home
                    </Link>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
