import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
