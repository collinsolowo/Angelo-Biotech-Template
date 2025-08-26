import React, { useState } from 'react';
import { Sun, Moon, Droplets, Zap, Plus, Info, ArrowRight } from 'lucide-react';

const BeautySkinCollection = ({ products = [] }) => {
  const [selectedConcern, setSelectedConcern] = useState('anti-aging');
  const [routineBuilder, setRoutineBuilder] = useState({
    am: [],
    pm: []
  });
  const [showGlossary, setShowGlossary] = useState(false);

  const skinConcerns = [
    {
      id: 'anti-aging',
      name: 'Anti-Aging',
      icon: Zap,
      description: 'Fine lines, wrinkles, and skin firmness',
      color: '#7C4DFF'
    },
    {
      id: 'hydration',
      name: 'Hydration',
      icon: Droplets,
      description: 'Dry skin and moisture barrier support',
      color: '#0099CC'
    },
    {
      id: 'barrier-repair',
      name: 'Barrier Repair',
      icon: Sun,
      description: 'Sensitive skin and barrier restoration',
      color: '#059669'
    }
  ];

  const ingredientGlossary = [
    {
      name: 'Retinol',
      description: 'Vitamin A derivative that promotes cell turnover and collagen production',
      usage: 'PM use only, start slowly',
      safety: 'Use sunscreen, avoid during pregnancy'
    },
    {
      name: 'Niacinamide',
      description: 'Vitamin B3 that reduces inflammation and improves skin texture',
      usage: 'AM or PM, well-tolerated',
      safety: 'Generally safe for all skin types'
    },
    {
      name: 'Hyaluronic Acid',
      description: 'Humectant that holds up to 1000x its weight in water',
      usage: 'AM and PM on damp skin',
      safety: 'Safe for all skin types'
    },
    {
      name: 'Vitamin C',
      description: 'Antioxidant that brightens and protects against environmental damage',
      usage: 'AM use preferred, store properly',
      safety: 'Use sunscreen, may cause irritation initially'
    },
    {
      name: 'Ceramides',
      description: 'Lipids that restore and maintain skin barrier function',
      usage: 'AM and PM, ideal for dry skin',
      safety: 'Safe and recommended for sensitive skin'
    },
    {
      name: 'Peptides',
      description: 'Amino acid chains that signal collagen production',
      usage: 'AM or PM, layer under moisturizer',
      safety: 'Well-tolerated, suitable for most skin types'
    }
  ];

  const getProductsForConcern = (concern) => {
    const concernMap = {
      'anti-aging': ['anti-aging', 'renewal', 'firming'],
      'hydration': ['hydrating', 'barrier', 'moisture'],
      'barrier-repair': ['barrier', 'repair', 'sensitive']
    };

    return products.filter(product => 
      concernMap[concern].some(keyword => 
        product.title.toLowerCase().includes(keyword) ||
        product.short_description.toLowerCase().includes(keyword) ||
        product.goal.some(goal => goal.includes(keyword))
      )
    );
  };

  const getRegimenSuggestion = (product) => {
    const title = product.title.toLowerCase();
    
    if (title.includes('vitamin c') || title.includes('brightening')) {
      return { time: 'am', step: 'serum', order: 2 };
    }
    if (title.includes('retinol') || title.includes('night')) {
      return { time: 'pm', step: 'treatment', order: 3 };
    }
    if (title.includes('eye')) {
      return { time: 'both', step: 'eye care', order: 4 };
    }
    if (title.includes('mask')) {
      return { time: 'pm', step: 'weekly treatment', order: 5 };
    }
    if (title.includes('hydrating') || title.includes('barrier')) {
      return { time: 'both', step: 'moisturizer', order: 3 };
    }
    
    return { time: 'both', step: 'treatment', order: 3 };
  };

  const addToRoutine = (product, time) => {
    const suggestion = getRegimenSuggestion(product);
    const targetTime = time || suggestion.time;
    
    if (targetTime === 'both') {
      setRoutineBuilder(prev => ({
        am: [...prev.am, { ...product, step: suggestion.step, order: suggestion.order }],
        pm: [...prev.pm, { ...product, step: suggestion.step, order: suggestion.order }]
      }));
    } else {
      setRoutineBuilder(prev => ({
        ...prev,
        [targetTime]: [...prev[targetTime], { ...product, step: suggestion.step, order: suggestion.order }]
      }));
    }

    // Show success toast
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.innerHTML = `Added ${product.title} to your ${targetTime === 'both' ? 'AM & PM' : targetTime.toUpperCase()} routine!`;
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
  };

  const removeFromRoutine = (productId, time) => {
    setRoutineBuilder(prev => ({
      ...prev,
      [time]: prev[time].filter(p => p.id !== productId)
    }));
  };

  const clearRoutine = () => {
    setRoutineBuilder({ am: [], pm: [] });
  };

  const selectedProducts = getProductsForConcern(selectedConcern);

  if (products.length === 0) {
    return null;
  }

  return (
    <section style={{ 
      background: 'var(--bg)', 
      padding: '4rem 0' 
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Beauty & Skin Care
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-sub)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Clinically-backed skincare solutions formulated with dermatologist-approved ingredients. 
            Build your personalized routine for optimal skin health.
          </p>
        </div>

        {/* Skin Concern Selector */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {skinConcerns.map(concern => {
            const Icon = concern.icon;
            const isSelected = selectedConcern === concern.id;
            
            return (
              <button
                key={concern.id}
                onClick={() => setSelectedConcern(concern.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius)',
                  border: isSelected ? `2px solid ${concern.color}` : '2px solid var(--border)',
                  background: isSelected ? `${concern.color}15` : 'var(--white)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '180px',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = concern.color;
                    e.target.style.background = `${concern.color}10`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.background = 'var(--white)';
                  }
                }}
              >
                <div style={{
                  background: isSelected ? concern.color : 'var(--bg)',
                  borderRadius: '50%',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={24} color={isSelected ? 'white' : concern.color} />
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    marginBottom: '0.5rem',
                    color: isSelected ? concern.color : 'var(--text-primary)'
                  }}>
                    {concern.name}
                  </h3>
                  <p style={{ 
                    fontSize: '0.9rem',
                    color: 'var(--text-sub)',
                    margin: 0
                  }}>
                    {concern.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Product Collection */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {selectedProducts.map((product) => {
            const suggestion = getRegimenSuggestion(product);
            
            return (
              <div 
                key={product.id}
                className="card"
                style={{
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <div style={{ padding: '1.5rem' }}>
                  {/* Product Image */}
                  <div style={{ 
                    position: 'relative',
                    aspectRatio: '4/3',
                    marginBottom: '1.5rem',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius)'
                  }}>
                    <img
                      src={product.images[0]?.src}
                      alt={product.images[0]?.alt}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    
                    {/* Dermatologist Note */}
                    <div style={{ 
                      position: 'absolute', 
                      top: '1rem', 
                      right: '1rem',
                      background: 'rgba(255, 255, 255, 0.95)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      Dermatologist Tested
                    </div>

                    {/* Usage Time Indicator */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '1rem', 
                      left: '1rem',
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      {(suggestion.time === 'am' || suggestion.time === 'both') && (
                        <div style={{
                          background: '#FEF3C7',
                          color: '#92400E',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Sun size={12} />
                          AM
                        </div>
                      )}
                      {(suggestion.time === 'pm' || suggestion.time === 'both') && (
                        <div style={{
                          background: '#E0E7FF',
                          color: '#3730A3',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Moon size={12} />
                          PM
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    marginBottom: '0.75rem'
                  }}>
                    {product.title}
                  </h3>

                  <p style={{ 
                    color: 'var(--text-sub)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.5
                  }}>
                    {product.short_description}
                  </p>

                  {/* Key Ingredients */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ 
                      fontSize: '0.95rem', 
                      marginBottom: '0.75rem',
                      color: 'var(--text-primary)'
                    }}>
                      Key Actives:
                    </h4>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem' 
                    }}>
                      {product.ingredients.slice(0, 3).map((ingredient, index) => (
                        <span 
                          key={index}
                          style={{
                            background: 'var(--white)',
                            border: '1px solid var(--primary)',
                            color: 'var(--primary)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.8rem',
                            fontWeight: '500'
                          }}
                        >
                          {ingredient.name} {ingredient.amount}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Routine Builder Actions */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {suggestion.time === 'both' ? (
                      <>
                        <button
                          onClick={() => addToRoutine(product, 'am')}
                          className="btn-secondary"
                          style={{ 
                            flex: 1,
                            fontSize: '0.85rem',
                            padding: '0.6rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <Sun size={14} />
                          Add to AM
                        </button>
                        <button
                          onClick={() => addToRoutine(product, 'pm')}
                          className="btn-secondary"
                          style={{ 
                            flex: 1,
                            fontSize: '0.85rem',
                            padding: '0.6rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <Moon size={14} />
                          Add to PM
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => addToRoutine(product)}
                        className="btn-primary"
                        style={{ 
                          flex: 1,
                          fontSize: '0.9rem',
                          padding: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <Plus size={16} />
                        Add to {suggestion.time.toUpperCase()} Routine
                      </button>
                    )}
                  </div>

                  {/* Patch Test Suggestion */}
                  <div style={{
                    background: '#FEF3C7',
                    border: '1px solid #F59E0B',
                    borderRadius: 'var(--radius)',
                    padding: '0.75rem',
                    fontSize: '0.8rem',
                    color: '#92400E'
                  }}>
                    <strong>Patch Test Recommended:</strong> Apply small amount to inner arm 24h before first use
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Routine Builder */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '2rem', margin: 0 }}>
              Your Personalized Routine
            </h3>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowGlossary(!showGlossary)}
                className="btn-secondary"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <Info size={16} />
                Ingredient Guide
              </button>
              
              {(routineBuilder.am.length > 0 || routineBuilder.pm.length > 0) && (
                <button
                  onClick={clearRoutine}
                  style={{
                    background: 'var(--text-sub)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius)',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {routineBuilder.am.length === 0 && routineBuilder.pm.length === 0 ? (
            <div style={{ 
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-sub)'
            }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                No products added yet
              </p>
              <p>Select products above to build your personalized routine</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem'
            }}>
              {/* AM Routine */}
              {routineBuilder.am.length > 0 && (
                <div>
                  <h4 style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '1.3rem',
                    marginBottom: '1rem',
                    color: '#F59E0B'
                  }}>
                    <Sun size={20} />
                    Morning Routine
                  </h4>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    overflowX: 'auto',
                    padding: '1rem 0'
                  }}>
                    {routineBuilder.am
                      .sort((a, b) => a.order - b.order)
                      .map((product, index) => (
                        <React.Fragment key={`${product.id}-am`}>
                          <div style={{
                            minWidth: '200px',
                            background: 'var(--bg)',
                            padding: '1rem',
                            borderRadius: 'var(--radius)',
                            textAlign: 'center',
                            position: 'relative'
                          }}>
                            <button
                              onClick={() => removeFromRoutine(product.id, 'am')}
                              style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '0.5rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                color: 'var(--text-sub)'
                              }}
                            >
                              ×
                            </button>
                            
                            <img
                              src={product.images[0]?.src}
                              alt={product.images[0]?.alt}
                              style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                                borderRadius: 'var(--radius)',
                                margin: '0 auto 0.75rem'
                              }}
                            />
                            <div style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                              {product.title}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                              {product.step}
                            </div>
                          </div>
                          
                          {index < routineBuilder.am.length - 1 && (
                            <ArrowRight size={20} color="var(--text-sub)" />
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              )}

              {/* PM Routine */}
              {routineBuilder.pm.length > 0 && (
                <div>
                  <h4 style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '1.3rem',
                    marginBottom: '1rem',
                    color: '#3730A3'
                  }}>
                    <Moon size={20} />
                    Evening Routine
                  </h4>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    overflowX: 'auto',
                    padding: '1rem 0'
                  }}>
                    {routineBuilder.pm
                      .sort((a, b) => a.order - b.order)
                      .map((product, index) => (
                        <React.Fragment key={`${product.id}-pm`}>
                          <div style={{
                            minWidth: '200px',
                            background: 'var(--bg)',
                            padding: '1rem',
                            borderRadius: 'var(--radius)',
                            textAlign: 'center',
                            position: 'relative'
                          }}>
                            <button
                              onClick={() => removeFromRoutine(product.id, 'pm')}
                              style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '0.5rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                color: 'var(--text-sub)'
                              }}
                            >
                              ×
                            </button>
                            
                            <img
                              src={product.images[0]?.src}
                              alt={product.images[0]?.alt}
                              style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                                borderRadius: 'var(--radius)',
                                margin: '0 auto 0.75rem'
                              }}
                            />
                            <div style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                              {product.title}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                              {product.step}
                            </div>
                          </div>
                          
                          {index < routineBuilder.pm.length - 1 && (
                            <ArrowRight size={20} color="var(--text-sub)" />
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ingredient Glossary Modal */}
        {showGlossary && (
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
                setShowGlossary(false);
              }
            }}
          >
            <div style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>
                  Skincare Ingredient Glossary
                </h3>
                <button
                  onClick={() => setShowGlossary(false)}
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

              <div style={{ 
                display: 'grid',
                gap: '1.5rem'
              }}>
                {ingredientGlossary.map(ingredient => (
                  <div 
                    key={ingredient.name}
                    style={{
                      padding: '1.5rem',
                      background: 'var(--bg)',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <h4 style={{ 
                      fontSize: '1.2rem', 
                      marginBottom: '0.75rem',
                      color: 'var(--text-primary)'
                    }}>
                      {ingredient.name}
                    </h4>
                    
                    <p style={{ 
                      color: 'var(--text-sub)',
                      marginBottom: '1rem',
                      lineHeight: 1.5
                    }}>
                      {ingredient.description}
                    </p>

                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem'
                    }}>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                          Usage:
                        </strong>
                        <p style={{ 
                          margin: '0.25rem 0 0 0',
                          color: 'var(--text-sub)',
                          fontSize: '0.9rem'
                        }}>
                          {ingredient.usage}
                        </p>
                      </div>
                      
                      <div>
                        <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                          Safety:
                        </strong>
                        <p style={{ 
                          margin: '0.25rem 0 0 0',
                          color: 'var(--text-sub)',
                          fontSize: '0.9rem'
                        }}>
                          {ingredient.safety}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeautySkinCollection;