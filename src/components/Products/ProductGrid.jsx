import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductQuickViewModal from './ProductQuickViewModal';

const ProductGrid = ({ products = [], loading = false }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayCount, setDisplayCount] = useState(12);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const loadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  const displayedProducts = products.slice(0, displayCount);
  const hasMore = displayCount < products.length;

  if (loading) {
    return (
      <div id="products-grid" className="grid grid-3" style={{ marginTop: '2rem' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton card" style={{ height: '400px' }}></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem',
        color: 'var(--text-sub)'
      }}>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <section id="products-grid" style={{ marginTop: '2rem' }}>
      <div 
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-md)'
        }}
      >
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={() => handleQuickView(product)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem' 
        }}>
          <button
            onClick={loadMore}
            className="btn-primary"
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem'
            }}
          >
            Load More Products ({products.length - displayCount} remaining)
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default ProductGrid;