import React, { useEffect, useRef } from 'react';
import { X, Star, Shield, Award, ExternalLink } from 'lucide-react';

const ProductQuickViewModal = ({ product, onClose }) => {
  const modalRef = useRef();
  const previousFocusRef = useRef();

  useEffect(() => {
    // Store previous focus
    previousFocusRef.current = document.activeElement;
    
    // Focus the modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quick_view_open', {
        event_category: 'Product',
        event_label: product.id
      });
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      // Restore body scrolling
      document.body.style.overflow = '';
      
      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }

      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, product.id]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} fill="var(--accent)" color="var(--accent)" />
        ))}
        {hasHalfStar && (
          <Star size={16} fill="var(--accent)" color="var(--accent)" style={{ opacity: 0.5 }} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={16} color="var(--border)" />
        ))}
        <span style={{ marginLeft: '0.5rem', fontSize: '1rem', color: 'var(--text-sub)' }}>
          {rating} out of 5
        </span>
      </div>
    );
  };

  return (
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
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: 'var(--shadow)'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          padding: '2rem'
        }}>
          {/* Product Images */}
          <div style={{ position: 'relative' }}>
            <img
              src={product.images[0]?.src}
              alt={product.images[0]?.alt}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: 'var(--radius)'
              }}
            />
            
            {/* Badges */}
            <div style={{ 
              position: 'absolute', 
              top: '1rem', 
              left: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {product.badges.map(badge => (
                <span 
                  key={badge}
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h2 id="modal-title" style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem',
              color: 'var(--text-primary)'
            }}>
              {product.title}
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              {renderRatingStars(product.rating)}
            </div>

            <p style={{ 
              fontSize: '1.1rem',
              color: 'var(--text-sub)',
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              {product.short_description}
            </p>

            {/* Health Goals */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Health Goals</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.goal.map(goal => (
                  <span 
                    key={goal}
                    style={{
                      background: 'var(--bg)',
                      color: 'var(--primary)',
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      border: '2px solid rgba(0, 195, 255, 0.2)'
                    }}
                  >
                    {goal.charAt(0).toUpperCase() + goal.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Key Ingredients</h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {product.ingredients.map((ingredient, index) => (
                  <div 
                    key={index}
                    style={{
                      background: 'var(--bg)',
                      padding: '1rem',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {ingredient.name}
                    </strong>
                    <div style={{ color: 'var(--text-sub)', fontSize: '0.9rem' }}>
                      {ingredient.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Product Details</h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <strong>Format:</strong>
                  <div style={{ color: 'var(--text-sub)' }}>
                    {product.format.charAt(0).toUpperCase() + product.format.slice(1)}
                  </div>
                </div>
                <div>
                  <strong>Servings:</strong>
                  <div style={{ color: 'var(--text-sub)' }}>
                    {product.servings} per container
                  </div>
                </div>
                <div>
                  <strong>Category:</strong>
                  <div style={{ color: 'var(--text-sub)' }}>
                    {product.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Safety & Certifications */}
            {(product.meta?.safety_notes || product.meta?.certifications) && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Safety & Quality</h3>
                
                {product.meta.safety_notes && (
                  <div style={{ 
                    background: '#FEF3C7', 
                    border: '1px solid #F59E0B', 
                    borderRadius: 'var(--radius)',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <Shield size={16} color="#F59E0B" style={{ marginTop: '2px' }} />
                      <div>
                        <strong style={{ color: '#92400E' }}>Safety Note:</strong>
                        <div style={{ color: '#92400E' }}>{product.meta.safety_notes}</div>
                      </div>
                    </div>
                  </div>
                )}

                {product.meta.certifications && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {product.meta.certifications.map(cert => (
                      <span 
                        key={cert}
                        style={{
                          background: '#ECFDF5',
                          color: '#059669',
                          padding: '0.5rem 1rem',
                          borderRadius: 'var(--radius)',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          border: '1px solid #A7F3D0'
                        }}
                      >
                        <Award size={14} />
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Lab Reports */}
            {product.lab_reports?.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Testing & Documentation</h3>
                {product.lab_reports.map((report, index) => (
                  <a
                    key={index}
                    href={report.url}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      padding: '0.5rem 1rem',
                      border: '1px solid var(--primary)',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--primary)';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'var(--primary)';
                    }}
                  >
                    <ExternalLink size={14} />
                    {report.title}
                  </a>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex',
              gap: '1rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)'
            }}>
              <button
                className="btn-primary"
                style={{ 
                  flex: 1,
                  padding: '1rem 2rem',
                  fontSize: '1.1rem'
                }}
                onClick={() => {
                  // Analytics event
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'product_inquiry', {
                      event_category: 'Product',
                      event_label: product.id,
                      inquiry_type: 'sample_request'
                    });
                  }
                  
                  // Show toast and close modal
                  const toast = document.createElement('div');
                  toast.className = 'toast success';
                  toast.innerHTML = 'Sample request submitted successfully!';
                  toast.setAttribute('aria-live', 'polite');
                  document.body.appendChild(toast);
                  
                  setTimeout(() => toast.remove(), 3000);
                  onClose();
                }}
              >
                Request Sample
              </button>
              
              <button
                className="btn-secondary"
                style={{ 
                  flex: 1,
                  padding: '1rem 2rem',
                  fontSize: '1.1rem'
                }}
                onClick={() => {
                  // Analytics event
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'product_inquiry', {
                      event_category: 'Product',
                      event_label: product.id,
                      inquiry_type: 'save_to_routine'
                    });
                  }
                  
                  // Show toast and close modal
                  const toast = document.createElement('div');
                  toast.className = 'toast success';
                  toast.innerHTML = 'Added to your routine!';
                  toast.setAttribute('aria-live', 'polite');
                  document.body.appendChild(toast);
                  
                  setTimeout(() => toast.remove(), 3000);
                  onClose();
                }}
              >
                Add to Routine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;