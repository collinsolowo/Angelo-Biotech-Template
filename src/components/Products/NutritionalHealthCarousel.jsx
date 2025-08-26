import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Info } from 'lucide-react';

const NutritionalHealthCarousel = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  // Create curated routine bundles
  const routines = [
    {
      id: 'cognitive-performance',
      title: 'Cognitive Performance Stack',
      description: 'Enhanced focus, memory, and mental clarity',
      products: products.filter(p => p.goal.includes('cognition')).slice(0, 3),
      duration: 'Daily for optimal results',
      benefits: ['Improved focus', 'Better memory recall', 'Mental energy']
    },
    {
      id: 'longevity-essentials',
      title: 'Longevity Essentials',
      description: 'Cellular health and anti-aging support',
      products: products.filter(p => p.goal.includes('longevity') || p.goal.includes('energy')).slice(0, 3),
      duration: 'Long-term wellness protocol',
      benefits: ['Cellular protection', 'Energy optimization', 'Healthy aging']
    },
    {
      id: 'sleep-recovery',
      title: 'Sleep & Recovery Protocol',
      description: 'Complete rest and restoration support',
      products: products.filter(p => p.goal.includes('sleep') || p.goal.includes('recovery')).slice(0, 2),
      duration: 'Evening routine',
      benefits: ['Better sleep quality', 'Faster recovery', 'Stress reduction']
    },
    {
      id: 'immune-wellness',
      title: 'Immune Wellness Bundle',
      description: 'Comprehensive immune system support',
      products: products.filter(p => p.goal.includes('immunity') || p.goal.includes('wellness')).slice(0, 3),
      duration: 'Year-round protection',
      benefits: ['Immune resilience', 'Overall wellness', 'Seasonal support']
    }
  ];

  const validRoutines = routines.filter(routine => routine.products.length > 0);
  const itemsToShow = 3;
  const maxIndex = Math.max(0, validRoutines.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleAddRoutine = (routine) => {
    // Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'routine_add', {
        event_category: 'Routine',
        event_label: routine.id,
        products: routine.products.map(p => p.id)
      });
    }

    // Show success message
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="color: var(--primary);">✓</span>
        ${routine.title} added to your routine!
      </div>
    `;
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
  };

  if (validRoutines.length === 0) {
    return null;
  }

  return (
    <section style={{ 
      background: 'var(--white)', 
      padding: '4rem 0' 
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Nutritional Health Routines
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-sub)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Scientifically curated combinations for optimal health outcomes. 
            Each routine is designed by our research team for maximum synergy.
          </p>
        </div>

        {/* Routine Carousel */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div 
            style={{
              display: 'flex',
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              transition: 'transform 0.4s ease',
              gap: '1.5rem'
            }}
          >
            {validRoutines.map((routine) => (
              <div 
                key={routine.id}
                style={{
                  minWidth: `calc(${100 / itemsToShow}% - 1rem)`,
                  background: 'var(--bg)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  border: '1px solid var(--border)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-8px)';
                  e.target.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {/* Product Thumbnails */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {routine.products.map((product, index) => (
                    <div 
                      key={product.id}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid var(--primary)',
                        marginLeft: index > 0 ? '-10px' : '0',
                        zIndex: routine.products.length - index
                      }}
                    >
                      <img
                        src={product.images[0]?.src}
                        alt={product.images[0]?.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <h3 style={{ 
                  fontSize: '1.4rem', 
                  marginBottom: '0.75rem',
                  textAlign: 'center'
                }}>
                  {routine.title}
                </h3>

                <p style={{ 
                  color: 'var(--text-sub)',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem',
                  lineHeight: 1.5
                }}>
                  {routine.description}
                </p>

                <div style={{ 
                  background: 'var(--white)',
                  padding: '1rem',
                  borderRadius: 'var(--radius)',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ 
                    fontSize: '0.9rem',
                    color: 'var(--text-sub)',
                    marginBottom: '0.75rem'
                  }}>
                    <strong>Duration:</strong> {routine.duration}
                  </div>
                  
                  <div style={{ fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Key Benefits:</strong>
                    <ul style={{ 
                      margin: '0.5rem 0 0 0', 
                      paddingLeft: '1.25rem',
                      color: 'var(--text-sub)'
                    }}>
                      {routine.benefits.map((benefit, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '0.75rem',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={() => handleAddRoutine(routine)}
                    className="btn-primary"
                    style={{ 
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem'
                    }}
                  >
                    <Plus size={16} />
                    Add Routine
                  </button>
                  
                  <button
                    onClick={() => setSelectedRoutine(routine)}
                    className="btn-secondary"
                    style={{ 
                      width: '44px',
                      height: '44px',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    aria-label={`View details for ${routine.title}`}
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {validRoutines.length > itemsToShow && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === 0 ? 0.5 : 1,
                  boxShadow: 'var(--shadow)',
                  zIndex: 2
                }}
                aria-label="Previous routines"
              >
                <ChevronLeft size={24} color="var(--text-primary)" />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentIndex === maxIndex ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === maxIndex ? 0.5 : 1,
                  boxShadow: 'var(--shadow)',
                  zIndex: 2
                }}
                aria-label="Next routines"
              >
                <ChevronRight size={24} color="var(--text-primary)" />
              </button>
            </>
          )}
        </div>

        {/* Routine Details Modal */}
        {selectedRoutine && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedRoutine(null);
              }
            }}
          >
            <div style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>
                  {selectedRoutine.title}
                </h3>
                <button
                  onClick={() => setSelectedRoutine(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'var(--text-sub)'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Products in this routine:</h4>
                {selectedRoutine.products.map(product => (
                  <div 
                    key={product.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'var(--bg)',
                      borderRadius: 'var(--radius)',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <img
                      src={product.images[0]?.src}
                      alt={product.images[0]?.alt}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius)'
                      }}
                    />
                    <div>
                      <h5 style={{ margin: '0 0 0.25rem 0' }}>
                        {product.title}
                      </h5>
                      <p style={{ 
                        margin: 0, 
                        color: 'var(--text-sub)',
                        fontSize: '0.9rem'
                      }}>
                        {product.short_description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  handleAddRoutine(selectedRoutine);
                  setSelectedRoutine(null);
                }}
                className="btn-primary"
                style={{ 
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem'
                }}
              >
                Add Complete Routine
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NutritionalHealthCarousel;