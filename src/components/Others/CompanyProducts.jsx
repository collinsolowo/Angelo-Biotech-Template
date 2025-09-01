import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Package, Sparkles, Target, Shield } from 'lucide-react';
import productsData from '../../data/products.json';

const CompanyProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [products.length]);

  if (products.length === 0) {
    return (
      <section className="company-products-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Our Premium Products</h2>
            <p className="lead">Loading our premium product collection...</p>
          </div>
        </div>
      </section>
    );
  }

  const currentProduct = products[currentSlide];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Nutritional Health':
        return <Sparkles size={20} />;
      case 'Beauty & Skin Care':
        return <Target size={20} />;
      case 'Home Technology':
        return <Shield size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Nutritional Health':
        return '#059669';
      case 'Beauty & Skin Care':
        return '#7C4DFF';
      case 'Home Technology':
        return '#00C3FF';
      default:
        return '#00C3FF';
    }
  };

  return (
    <section className="company-products-section">
      <div className="section-inner">
        <div className="section-header">
          <h2>Our Premium Products</h2>
          <p className="lead">
            Discover our comprehensive range of science-backed solutions designed to enhance your daily wellness routine.
          </p>
        </div>

        <div className="products-carousel">
          <div className="carousel-viewport">
            {/* Render all slides, but only show the active one */}
            {products.map((product, index) => (
              <div 
                key={product.id}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="product-figure">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg';
                    }}
                  />
                </div>

                <div className="product-copy">
                  <div 
                    className="product-sub"
                    style={{ 
                      color: getCategoryColor(product.category),
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    {getCategoryIcon(product.category)}
                    {product.category}
                  </div>

                  <h3 className="product-title">{product.title}</h3>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      marginBottom: '12px',
                      color: '#b328b8ff'
                    }}>
                      Key Benefits
                    </h4>
                    <ul style={{ 
                      listStyle: 'none', 
                      padding: 0, 
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      {product.keyBenefits.slice(0, 4).map((benefit, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px',
                          color: '#6B7280'
                        }}>
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: getCategoryColor(product.category),
                            flexShrink: 0
                          }}></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href="/products" className="btn btn-primary">
                    View All
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProducts;