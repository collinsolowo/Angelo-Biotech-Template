import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';;
import './styles/variables.css';
import './styles/base.css';
import './App.css'
import AboutPage from './components/AboutPage';
import HomePage from './components/Homepage';
import ContactPage from './components/ContactPage';
import ProductsPage from './components/Products/ProductsPage';

// Device memory and reduced motion detection
function initializePerformanceOptimizations() {
  // Check for reduced motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-bg');
  }
  
  // Check for low memory devices
  if (navigator.deviceMemory && navigator.deviceMemory < 1.5) {
    document.body.classList.add('reduced-bg');
  }
  
  // Check for slow connection
  if (navigator.connection && navigator.connection.effectiveType && 
      ['slow-2g', '2g'].includes(navigator.connection.effectiveType)) {
    document.body.classList.add('reduced-bg');
  }
}

function App() {
  useEffect(() => {
    initializePerformanceOptimizations();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage/>} /> {/* Placeholder - scrolls to products section */}
          <Route path="/leadership" element={<HomePage />} /> {/* Placeholder - scrolls to team section */}
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
