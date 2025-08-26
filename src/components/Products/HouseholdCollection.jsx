import React, { useState } from 'react';
import { Shield, Leaf, Users, Home, Download, ChevronDown } from 'lucide-react';

const HouseholdCollection = ({ products = [] }) => {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);

  const quizQuestions = [
    {
      id: 'space_type',
      question: 'What type of space do you need products for?',
      options: [
        { value: 'kitchen', label: 'Kitchen & Dining', icon: '🍽️' },
        { value: 'bathroom', label: 'Bathroom', icon: '🚿' },
        { value: 'living', label: 'Living Areas', icon: '🛋️' },
        { value: 'laundry', label: 'Laundry Room', icon: '🧺' },
        { value: 'whole_home', label: 'Whole Home', icon: '🏠' }
      ]
    },
    {
      id: 'priority',
      question: 'What\'s your main priority?',
      options: [
        { value: 'safety', label: 'Family Safety', icon: '👶' },
        { value: 'eco', label: 'Eco-Friendly', icon: '🌱' },
        { value: 'effectiveness', label: 'Maximum Effectiveness', icon: '💪' },
        { value: 'convenience', label: 'Convenience', icon: '⚡' }
      ]
    }
  ];

  const getRecommendations = (answers) => {
    let recommendations = [...products];
    
    // Filter based on space type and priority
    if (answers.space_type === 'kitchen') {
      recommendations = recommendations.filter(p => 
        p.title.toLowerCase().includes('kitchen') || 
        p.title.toLowerCase().includes('surface') ||
        p.title.toLowerCase().includes('disinfectant')
      );
    }
    
    if (answers.space_type === 'laundry') {
      recommendations = recommendations.filter(p => 
        p.title.toLowerCase().includes('laundry') ||
        p.title.toLowerCase().includes('detergent')
      );
    }

    if (answers.priority === 'eco') {
      recommendations = recommendations.filter(p => 
        p.badges.some(badge => 
          badge.toLowerCase().includes('eco') || 
          badge.toLowerCase().includes('plant')
        )
      );
    }

    return recommendations.slice(0, 3);
  };

  const handleQuizAnswer = (questionId, answer) => {
    const newAnswers = { ...quizAnswers, [questionId]: answer };
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Generate recommendations
      const recommendations = getRecommendations(newAnswers);
      setQuizResults(recommendations);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResults(null);
  };

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
            Household Essentials
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-sub)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Safe, effective, and eco-friendly products for every room in your home. 
            Trusted by families who prioritize health and sustainability.
          </p>
        </div>

        {/* Product Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {products.map((product) => (
            <div 
              key={product.id}
              className="card"
              style={{
                position: 'relative',
                overflow: 'visible',
                transition: 'all 0.3s ease'
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
                  
                  {/* Safety Badges */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    right: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {product.badges.map(badge => (
                      <span 
                        key={badge}
                        style={{
                          background: badge.toLowerCase().includes('safe') || badge.toLowerCase().includes('non-toxic') 
                            ? '#059669' 
                            : badge.toLowerCase().includes('eco') 
                            ? '#0891B2' 
                            : 'var(--primary)',
                          color: 'white',
                          padding: '0.5rem',
                          borderRadius: 'var(--radius)',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          textAlign: 'center'
                        }}
                      >
                        {badge}
                      </span>
                    ))}
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

                {/* Certifications */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ 
                    fontSize: '0.9rem', 
                    marginBottom: '0.75rem',
                    color: 'var(--text-primary)'
                  }}>
                    Certifications & Safety:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {product.meta?.certifications?.map(cert => (
                      <span 
                        key={cert}
                        style={{
                          background: '#ECFDF5',
                          color: '#059669',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          border: '1px solid #A7F3D0'
                        }}
                      >
                        <Shield size={12} />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Usage Guide Toggle */}
                <button
                  onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: expandedProduct === product.id ? '1rem' : '1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '500'
                  }}
                >
                  Usage Guide & Safety
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      transform: expandedProduct === product.id ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </button>

                {/* Expanded Usage Guide */}
                {expandedProduct === product.id && (
                  <div style={{
                    background: '#F8FAFC',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius)',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <h5 style={{ 
                        fontSize: '0.9rem', 
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        Recommended Use:
                      </h5>
                      <ul style={{ 
                        paddingLeft: '1.25rem', 
                        margin: 0,
                        color: 'var(--text-sub)',
                        fontSize: '0.85rem',
                        lineHeight: 1.4
                      }}>
                        {product.format === 'spray' ? (
                          <>
                            <li>Spray directly onto surface from 6-8 inches away</li>
                            <li>Allow to sit for 30 seconds for optimal effectiveness</li>
                            <li>Wipe with clean microfiber cloth</li>
                            <li>No need to rinse on food-safe surfaces</li>
                          </>
                        ) : product.format === 'pods' ? (
                          <>
                            <li>Use one pod per regular load</li>
                            <li>Place pod in bottom of washer drum before clothes</li>
                            <li>Use warm or cold water for best results</li>
                            <li>Store in original container, away from moisture</li>
                          </>
                        ) : (
                          <>
                            <li>Follow label instructions for dilution ratios</li>
                            <li>Test on inconspicuous area first</li>
                            <li>Use in well-ventilated area</li>
                            <li>Store in cool, dry place</li>
                          </>
                        )}
                      </ul>
                    </div>

                    {product.meta?.safety_notes && (
                      <div style={{
                        background: '#FEF3C7',
                        border: '1px solid #F59E0B',
                        borderRadius: 'var(--radius)',
                        padding: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <Shield size={14} color="#F59E0B" style={{ marginTop: '2px' }} />
                          <div>
                            <strong style={{ color: '#92400E', fontSize: '0.85rem' }}>Safety Note:</strong>
                            <div style={{ color: '#92400E', fontSize: '0.85rem' }}>
                              {product.meta.safety_notes}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem'
                }}>
                  <button
                    className="btn-primary"
                    style={{ 
                      flex: 1,
                      fontSize: '0.95rem',
                      padding: '0.75rem 1rem'
                    }}
                    onClick={() => {
                      const toast = document.createElement('div');
                      toast.className = 'toast success';
                      toast.innerHTML = 'Added to your routine!';
                      toast.setAttribute('aria-live', 'polite');
                      document.body.appendChild(toast);
                      
                      setTimeout(() => toast.remove(), 3000);
                    }}
                  >
                    Add to Kit
                  </button>

                  {product.lab_reports?.length > 0 && (
                    <button
                      onClick={() => window.open(product.lab_reports[0].url, '_blank')}
                      style={{
                        background: 'var(--white)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius)',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      aria-label="Download safety data sheet"
                    >
                      <Download size={16} color="var(--text-sub)" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Home Compatibility Quiz */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Find Compatible Products for Your Home
          </h3>
          
          {!quizResults ? (
            <>
              <p style={{ 
                color: 'var(--text-sub)',
                marginBottom: '2rem',
                fontSize: '1.1rem'
              }}>
                Answer 2 quick questions to get personalized product recommendations
              </p>

              {quizStep < quizQuestions.length ? (
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                  <div style={{ 
                    marginBottom: '2rem',
                    background: 'var(--bg)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.9rem',
                    color: 'var(--text-sub)'
                  }}>
                    Question {quizStep + 1} of {quizQuestions.length}
                  </div>

                  <h4 style={{ 
                    fontSize: '1.3rem', 
                    marginBottom: '2rem',
                    color: 'var(--text-primary)'
                  }}>
                    {quizQuestions[quizStep].question}
                  </h4>

                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    {quizQuestions[quizStep].options.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleQuizAnswer(quizQuestions[quizStep].id, option.value)}
                        style={{
                          padding: '1.5rem',
                          border: '2px solid var(--border)',
                          borderRadius: 'var(--radius)',
                          background: 'var(--white)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '1rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = 'var(--primary)';
                          e.target.style.background = 'var(--bg)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.background = 'var(--white)';
                        }}
                      >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                          {option.icon}
                        </div>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#ECFDF5',
                  color: '#059669',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  marginBottom: '1.5rem'
                }}>
                  <Shield size={20} />
                  Perfect Matches Found!
                </div>
                
                <p style={{ 
                  color: 'var(--text-sub)',
                  fontSize: '1.1rem'
                }}>
                  Based on your preferences, here are our top recommendations:
                </p>
              </div>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                {quizResults.map((product, index) => (
                  <div 
                    key={product.id}
                    style={{
                      background: 'var(--bg)',
                      padding: '1.5rem',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '1rem',
                      background: 'var(--primary)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {95 - (index * 5)}% Match
                    </div>

                    <img
                      src={product.images[0]?.src}
                      alt={product.images[0]?.alt}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius)',
                        margin: '0 auto 1rem',
                        display: 'block'
                      }}
                    />

                    <h5 style={{ 
                      fontSize: '1.1rem', 
                      marginBottom: '0.5rem',
                      textAlign: 'center'
                    }}>
                      {product.title}
                    </h5>
                    
                    <p style={{ 
                      color: 'var(--text-sub)',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      marginBottom: '1rem'
                    }}>
                      {product.short_description}
                    </p>

                    <button
                      className="btn-primary"
                      style={{ 
                        width: '100%',
                        fontSize: '0.9rem',
                        padding: '0.75rem'
                      }}
                      onClick={() => {
                        const toast = document.createElement('div');
                        toast.className = 'toast success';
                        toast.innerHTML = 'Added to your routine!';
                        toast.setAttribute('aria-live', 'polite');
                        document.body.appendChild(toast);
                        
                        setTimeout(() => toast.remove(), 3000);
                      }}
                    >
                      Add to Routine
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={resetQuiz}
                className="btn-secondary"
                style={{ 
                  fontSize: '1rem',
                  padding: '0.75rem 2rem'
                }}
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HouseholdCollection;