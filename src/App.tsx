import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
};

export default App;
