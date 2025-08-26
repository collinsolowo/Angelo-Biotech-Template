import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, Shield, Zap, Truck } from 'lucide-react';

const HeroProducts = ({ featuredProducts = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || featuredProducts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredProducts.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const trustBadges = [
    { icon: Shield, text: 'Third-Party Tested', color: '#059669' },
    { icon: Award, text: 'GMP Certified', color: '#0099CC' },
    { icon: Zap, text: 'Clinically Backed', color: '#7C4DFF' },
    { icon: Truck, text: 'Free Delivery', color: '#F59E0B' }
  ];

  return (
    <section className="hero-products" style={{
      background: `linear-gradient(135deg, var(--bg) 0%, var(--white) 100%)`,
      padding: '4rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '3rem',
          alignItems: 'center',
          '@media (min-width: 1024px)': {
            gridTemplateColumns: '1fr 1fr'
          }
        }}>
          {/* Hero Content */}
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              marginBottom: '1.5rem',
              background: `linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Science-Backed Wellness Solutions
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem',
              color: 'var(--text-sub)',
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              Discover clinically studied supplements, smart home technology, and premium wellness products designed to optimize your health and longevity.
            </p>

            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>✓</span>
                Clinically studied formulations
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>✓</span>
                Third-party tested for purity
              </li>
            </ul>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              flexWrap: 'wrap',
              marginBottom: '3rem' 
            }}>
              <button 
                className="btn-primary"
                style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
                onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Collections
              </button>
              <button 
                className="btn-secondary"
                style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
                onClick={() => document.getElementById('product-finder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Find My Product
              </button>
            </div>
          </div>

          {/* Product Carousel */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                background: 'rgba(0, 195, 255, 0.05)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 195, 255, 0.1)'
              }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {featuredProducts.length > 0 && (
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                  <div 
                    style={{
                      display: 'flex',
                      transform: `translateX(-${currentSlide * 100}%)`,
                      transition: 'transform 0.5s ease'
                    }}
                  >
                    {featuredProducts.map((product, index) => (
                      <div 
                        key={product.id}
                        style={{
                          minWidth: '100%',
                          background: 'var(--white)',
                          borderRadius: 'var(--radius)',
                          padding: '1.5rem',
                          textAlign: 'center',
                          boxShadow: 'var(--shadow)'
                        }}
                      >
                        <img
                          src={product.images[0]?.src}
                          alt={product.images[0]?.alt}
                          loading="lazy"
                          style={{
                            width: '100%',
                            maxWidth: '200px',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius)',
                            marginBottom: '1rem'
                          }}
                        />
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                          {product.title}
                        </h3>
                        <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem' }}>
                          {product.short_description}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
                          {product.badges.map(badge => (
                            <span 
                              key={badge}
                              style={{
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1rem',
                                fontSize: '0.8rem',
                                fontWeight: '500'
                              }}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {featuredProducts.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        style={{
                          position: 'absolute',
                          left: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: 'var(--shadow)',
                          zIndex: 2
                        }}
                        aria-label="Previous product"
                      >
                        <ChevronLeft size={20} color="var(--primary)" />
                      </button>

                      <button
                        onClick={nextSlide}
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: 'var(--shadow)',
                          zIndex: 2
                        }}
                        aria-label="Next product"
                      >
                        <ChevronRight size={20} color="var(--primary)" />
                      </button>

                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '0.5rem',
                        marginTop: '1rem'
                      }}>
                        {featuredProducts.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              border: 'none',
                              background: index === currentSlide ? 'var(--primary)' : 'rgba(0, 195, 255, 0.3)',
                              cursor: 'pointer',
                              transition: 'background 0.2s ease'
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '4rem',
          padding: '2rem 0',
          borderTop: '1px solid var(--border)'
        }}>
          {trustBadges.map(({ icon: Icon, text, color }, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'var(--white)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Icon size={24} color={color} />
              <span style={{ fontWeight: '500' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroProducts;