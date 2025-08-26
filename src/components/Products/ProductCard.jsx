import React, { useState } from 'react';
import { Star, Heart, Eye, Plus, Download } from 'lucide-react';

const ProductCard = ({ product, onQuickView }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleSaveToRoutine = () => {
    setIsSaved(!isSaved);
    // Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'product_inquiry', {
        event_category: 'Product',
        event_label: product.id,
        inquiry_type: 'save_to_routine'
      });
    }
    
    // Show toast notification
    showToast(isSaved ? 'Removed from routine' : 'Added to routine');
  };

  const handleRequestSample = () => {
    // Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'product_inquiry', {
        event_category: 'Product',
        event_label: product.id,
        inquiry_type: 'sample_request'
      });
    }
    
    showToast('Sample request submitted');
  };

  const showToast = (message) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="color: var(--primary);">✓</span>
        ${message}
      </div>
    `;
    toast.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={14} fill="var(--accent)" color="var(--accent)" />
        ))}
        {hasHalfStar && (
          <Star size={14} fill="var(--accent)" color="var(--accent)" style={{ opacity: 0.5 }} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={14} color="var(--border)" />
        ))}
        <span style={{ marginLeft: '0.25rem', fontSize: '0.9rem', color: 'var(--text-sub)' }}>
          ({rating})
        </span>
      </div>
    );
  };

  const isOutOfStock = Math.random() < 0.1; // 10% chance for demo

  return (
    <article 
      className="card product-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        opacity: isOutOfStock ? 0.7 : 1
      }}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Product Image */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img
          src={product.images[0]?.src}
          alt={product.images[0]?.alt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        
        {/* Badges */}
        <div style={{ 
          position: 'absolute', 
          top: '0.75rem', 
          left: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}>
          {product.badges.slice(0, 2).map(badge => (
            <span 
              key={badge}
              style={{
                background: 'rgba(0, 195, 255, 0.9)',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                backdropFilter: 'blur(4px)'
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            Unavailable
          </div>
        )}

        {/* Quick Details Overlay */}
        {showDetails && !isOutOfStock && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
            color: 'white',
            padding: '2rem 1rem 1rem',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
              <strong>Key ingredients:</strong> {product.ingredients.slice(0, 2).map(ing => ing.name).join(', ')}
            </div>
            <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
              <strong>Servings:</strong> {product.servings} per container
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ 
          fontSize: '1.1rem',
          marginBottom: '0.5rem',
          lineHeight: 1.3,
          minHeight: '2.6rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.title}
        </h3>

        <p style={{ 
          color: 'var(--text-sub)',
          fontSize: '0.9rem',
          marginBottom: '1rem',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.short_description}
        </p>

        {/* Rating */}
        <div style={{ marginBottom: '1rem' }}>
          {renderRatingStars(product.rating)}
        </div>

        {/* Goals */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.25rem' 
          }}>
            {product.goal.slice(0, 3).map(goal => (
              <span 
                key={goal}
                style={{
                  background: 'var(--bg)',
                  color: 'var(--primary)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  border: '1px solid rgba(0, 195, 255, 0.2)'
                }}
              >
                {goal.charAt(0).toUpperCase() + goal.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem',
          marginTop: 'auto'
        }}>
          <button
            onClick={onQuickView}
            disabled={isOutOfStock}
            className="btn-secondary"
            style={{ 
              flex: 1,
              fontSize: '0.9rem',
              padding: '0.6rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isOutOfStock ? 0.5 : 1,
              cursor: isOutOfStock ? 'not-allowed' : 'pointer'
            }}
            aria-label={`View details for ${product.title}`}
          >
            <Eye size={16} />
            Quick View
          </button>

          {isOutOfStock ? (
            <button
              className="btn-primary"
              style={{ 
                flex: 1,
                fontSize: '0.9rem',
                padding: '0.6rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onClick={() => showToast('Request submitted - we\'ll notify when available')}
            >
              Request Info
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
              <button
                onClick={handleSaveToRoutine}
                className={isSaved ? "btn-primary" : "btn-secondary"}
                style={{ 
                  flex: 1,
                  fontSize: '0.9rem',
                  padding: '0.6rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                aria-label={isSaved ? `Remove ${product.title} from routine` : `Add ${product.title} to routine`}
              >
                <Plus size={16} />
                {isSaved ? 'Added' : 'Add to Kit'}
              </button>
            </div>
          )}
        </div>

        {/* Safety Data Sheet Link (for household products) */}
        {product.category === 'Household' && product.lab_reports?.length > 0 && (
          <div style={{ marginTop: '0.75rem' }}>
            <a
              href={product.lab_reports[0].url}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-sub)',
                fontSize: '0.8rem',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-sub)'}
            >
              <Download size={12} />
              Safety Data Sheet
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;