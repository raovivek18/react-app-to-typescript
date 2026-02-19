import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AppRoutes from './routes/AppRoutes';

interface AppProps { }

const App: React.FC<AppProps> = (): React.JSX.Element => {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
};

export default App;
