import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Target, Package, Shield, RotateCcw } from 'lucide-react';

const ProductFinderQuiz = ({ products = [] }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const quizSteps = [
    {
      id: 'goal',
      title: 'What\'s your primary health goal?',
      subtitle: 'Select the area you\'d like to focus on most',
      type: 'single',
      options: [
        { 
          value: 'energy', 
          label: 'Boost Energy & Focus', 
          icon: '⚡', 
          description: 'Natural energy without crashes' 
        },
        { 
          value: 'sleep', 
          label: 'Improve Sleep Quality', 
          icon: '🌙', 
          description: 'Better rest and recovery' 
        },
        { 
          value: 'cognition', 
          label: 'Enhance Mental Performance', 
          icon: '🧠', 
          description: 'Memory, focus, and clarity' 
        },
        { 
          value: 'longevity', 
          label: 'Support Healthy Aging', 
          icon: '🌱', 
          description: 'Cellular health and vitality' 
        },
        { 
          value: 'immunity', 
          label: 'Strengthen Immune System', 
          icon: '🛡️', 
          description: 'Natural defense support' 
        },
        { 
          value: 'cleaning', 
          label: 'Safe Home Environment', 
          icon: '🏠', 
          description: 'Non-toxic cleaning solutions' 
        },
        { 
          value: 'air-quality', 
          label: 'Monitor Health Metrics', 
          icon: '📊', 
          description: 'Track environmental factors' 
        },
        { 
          value: 'skin-care', 
          label: 'Skin Health & Beauty', 
          icon: '✨', 
          description: 'Healthy, radiant skin' 
        }
      ]
    },
    {
      id: 'format',
      title: 'What format do you prefer?',
      subtitle: 'Choose your preferred delivery method',
      type: 'single',
      options: [
        { value: 'capsule', label: 'Capsules', icon: '💊', description: 'Easy to swallow, no taste' },
        { value: 'powder', label: 'Powders', icon: '🥤', description: 'Mix into drinks or food' },
        { value: 'device', label: 'Smart Devices', icon: '📱', description: 'Technology-based solutions' },
        { value: 'topical', label: 'Topical Products', icon: '🧴', description: 'Creams, serums, sprays' },
        { value: 'any', label: 'No Preference', icon: '🤷', description: 'Open to all formats' }
      ]
    },
    {
      id: 'constraints',
      title: 'Any specific preferences?',
      subtitle: 'Select all that apply to you',
      type: 'multiple',
      options: [
        { value: 'vegan', label: 'Vegan/Plant-Based', icon: '🌱' },
        { value: 'organic', label: 'Organic Certified', icon: '🌿' },
        { value: 'fragrance-free', label: 'Fragrance-Free', icon: '🚫' },
        { value: 'sensitive', label: 'Sensitive Skin/System', icon: '🤲' },
        { value: 'eco-friendly', label: 'Eco-Friendly Packaging', icon: '♻️' },
        { value: 'third-party-tested', label: 'Third-Party Tested', icon: '🔬' }
      ]
    }
  ];

  const calculateMatches = (userAnswers) => {
    let scoredProducts = products.map(product => {
      let score = 0;
      let maxScore = 0;

      // Goal matching (40% weight)
      maxScore += 40;
      if (userAnswers.goal) {
        const goalMap = {
          'energy': ['energy', 'focus', 'cognition'],
          'sleep': ['sleep', 'recovery'],
          'cognition': ['cognition', 'focus', 'brain'],
          'longevity': ['longevity', 'anti-aging', 'cellular'],
          'immunity': ['immunity', 'wellness', 'immune'],
          'cleaning': ['cleaning', 'sanitization'],
          'air-quality': ['air quality', 'monitoring'],
          'skin-care': ['anti-aging', 'hydration', 'barrier']
        };

        const relevantGoals = goalMap[userAnswers.goal] || [userAnswers.goal];
        const matchingGoals = product.goal.filter(goal => 
          relevantGoals.some(relevant => 
            goal.toLowerCase().includes(relevant.toLowerCase()) ||
            relevant.toLowerCase().includes(goal.toLowerCase())
          )
        );

        if (matchingGoals.length > 0) {
          score += 40 * (matchingGoals.length / Math.max(product.goal.length, 1));
        }

        // Category bonus for specific goals
        if (userAnswers.goal === 'cleaning' && product.category === 'Household') score += 20;
        if (userAnswers.goal === 'air-quality' && product.category === 'Home Technology') score += 20;
        if (userAnswers.goal === 'skin-care' && product.category === 'Beauty & Skin Care') score += 20;
      }

      // Format matching (30% weight)
      maxScore += 30;
      if (userAnswers.format && userAnswers.format !== 'any') {
        const formatMap = {
          'topical': ['serum', 'cream', 'gel', 'mask', 'spray'],
          'device': ['device']
        };

        const acceptableFormats = formatMap[userAnswers.format] || [userAnswers.format];
        if (acceptableFormats.includes(product.format)) {
          score += 30;
        }
      } else if (userAnswers.format === 'any') {
        score += 15; // Partial score for flexibility
      }

      // Constraints matching (30% weight)
      maxScore += 30;
      if (userAnswers.constraints && userAnswers.constraints.length > 0) {
        let constraintMatches = 0;
        userAnswers.constraints.forEach(constraint => {
          const constraintMap = {
            'vegan': ['Vegan', 'Plant-Based'],
            'organic': ['Organic', 'USDA Organic'],
            'fragrance-free': ['Fragrance-Free', 'Unscented'],
            'sensitive': ['Sensitive Skin', 'Hypoallergenic', 'Gentle'],
            'eco-friendly': ['Eco-Friendly', 'Sustainable', 'Plastic-Free'],
            'third-party-tested': ['Third-Party Tested', 'Lab Tested', 'Clinically Tested']
          };

          const requiredBadges = constraintMap[constraint] || [];
          const hasMatch = requiredBadges.some(badge => 
            product.badges.some(productBadge => 
              productBadge.toLowerCase().includes(badge.toLowerCase()) ||
              badge.toLowerCase().includes(productBadge.toLowerCase())
            )
          );

          if (hasMatch) {
            constraintMatches++;
          }
        });

        if (userAnswers.constraints.length > 0) {
          score += 30 * (constraintMatches / userAnswers.constraints.length);
        }
      } else {
        score += 15; // Base score when no constraints
      }

      // Normalize score to percentage
      const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

      return {
        ...product,
        matchScore: percentage,
        matchReasons: getMatchReasons(product, userAnswers)
      };
    });

    // Sort by match score and return top results
    return scoredProducts
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5)
      .filter(product => product.matchScore > 20); // Only show reasonable matches
  };

  const getMatchReasons = (product, userAnswers) => {
    const reasons = [];

    // Check goal alignment
    if (userAnswers.goal) {
      const goalMap = {
        'energy': ['energy', 'focus'],
        'sleep': ['sleep', 'recovery'],
        'cognition': ['cognition', 'focus'],
        'longevity': ['longevity', 'anti-aging'],
        'immunity': ['immunity', 'wellness'],
        'cleaning': ['cleaning'],
        'air-quality': ['air quality'],
        'skin-care': ['anti-aging', 'hydration']
      };

      const relevantGoals = goalMap[userAnswers.goal] || [userAnswers.goal];
      const matchingGoals = product.goal.filter(goal => 
        relevantGoals.some(relevant => goal.toLowerCase().includes(relevant.toLowerCase()))
      );

      if (matchingGoals.length > 0) {
        reasons.push(`Supports ${matchingGoals.join(', ')}`);
      }
    }

    // Check format match
    if (userAnswers.format && userAnswers.format !== 'any' && product.format === userAnswers.format) {
      reasons.push(`Available in preferred ${product.format} format`);
    }

    // Check constraints
    if (userAnswers.constraints) {
      userAnswers.constraints.forEach(constraint => {
        const constraintMap = {
          'vegan': ['Vegan'],
          'organic': ['Organic'],
          'fragrance-free': ['Fragrance-Free'],
          'third-party-tested': ['Third-Party Tested', 'Lab Tested']
        };

        const requiredBadges = constraintMap[constraint] || [];
        const matchingBadge = product.badges.find(badge => 
          requiredBadges.some(required => badge.toLowerCase().includes(required.toLowerCase()))
        );

        if (matchingBadge) {
          reasons.push(matchingBadge);
        }
      });
    }

    return reasons;
  };

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results
      const matches = calculateMatches(answers);
      setResults(matches);

      // Analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'product_finder_complete', {
          event_category: 'Quiz',
          answers: answers,
          result_count: matches.length
        });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
    setIsStarted(false);
  };

  const startQuiz = () => {
    setIsStarted(true);
    
    // Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'product_finder_start', {
        event_category: 'Quiz'
      });
    }
  };

  const currentQuestion = quizSteps[currentStep];
  const isLastStep = currentStep === quizSteps.length - 1;
  const canProceed = answers[currentQuestion?.id];

  if (!isStarted) {
    return (
      <section 
        id="product-finder" 
        style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', 
          color: 'white',
          padding: '4rem 0' 
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Find Your Perfect Products
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Answer 3 quick questions to get personalized product recommendations 
            based on your health goals and preferences.
          </p>
          
          <button
            onClick={startQuiz}
            style={{
              background: 'white',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: 'var(--radius)',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0 auto',
              boxShadow: 'var(--shadow-lg)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'var(--shadow-lg)';
            }}
          >
            <Target size={24} />
            Start Product Finder
          </button>
        </div>
      </section>
    );
  }

  if (results) {
    return (
      <section style={{ 
        background: 'var(--white)', 
        padding: '4rem 0' 
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              background: '#ECFDF5',
              color: '#059669',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '2rem'
            }}>
              <Target size={24} />
              Your Personalized Recommendations
            </div>
            
            <p style={{ 
              fontSize: '1.1rem',
              color: 'var(--text-sub)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Based on your preferences, here are the products that best match your needs:
            </p>
          </div>

          {results.length > 0 ? (
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {results.map((product, index) => (
                <div 
                  key={product.id}
                  className="card"
                  style={{
                    position: 'relative',
                    border: index === 0 ? '2px solid var(--primary)' : '1px solid var(--border)'
                  }}
                >
                  {index === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--primary)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      whiteSpace: 'nowrap'
                    }}>
                      🎯 Best Match
                    </div>
                  )}

                  <div style={{ padding: '1.5rem' }}>
                    {/* Match Score */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: product.matchScore >= 80 ? '#059669' : product.matchScore >= 60 ? '#F59E0B' : 'var(--accent)',
                      color: 'white',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {product.matchScore}% Match
                    </div>

                    <img
                      src={product.images[0]?.src}
                      alt={product.images[0]?.alt}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius)',
                        marginBottom: '1.5rem'
                      }}
                      loading="lazy"
                    />

                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '0.75rem',
                      paddingRight: '60px' // Account for match score badge
                    }}>
                      {product.title}
                    </h3>

                    <p style={{ 
                      color: 'var(--text-sub)',
                      marginBottom: '1rem',
                      lineHeight: 1.5
                    }}>
                      {product.short_description}
                    </p>

                    {/* Match Reasons */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ 
                        fontSize: '0.95rem', 
                        marginBottom: '0.75rem',
                        color: 'var(--text-primary)'
                      }}>
                        Why this matches you:
                      </h4>
                      <ul style={{ 
                        paddingLeft: '1.25rem',
                        margin: 0,
                        color: 'var(--text-sub)',
                        fontSize: '0.9rem'
                      }}>
                        {product.matchReasons.slice(0, 3).map((reason, idx) => (
                          <li key={idx} style={{ marginBottom: '0.25rem' }}>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Product Badges */}
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      {product.badges.slice(0, 3).map(badge => (
                        <span 
                          key={badge}
                          style={{
                            background: 'var(--bg)',
                            color: 'var(--primary)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            border: '1px solid rgba(0, 195, 255, 0.2)'
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div style={{ 
                      display: 'flex',
                      gap: '0.75rem'
                    }}>
                      <button
                        className="btn-primary"
                        style={{ 
                          flex: 1,
                          fontSize: '0.9rem',
                          padding: '0.75rem'
                        }}
                        onClick={() => {
                          const toast = document.createElement('div');
                          toast.className = 'toast success';
                          toast.innerHTML = 'Sample request submitted!';
                          toast.setAttribute('aria-live', 'polite');
                          document.body.appendChild(toast);
                          
                          setTimeout(() => toast.remove(), 3000);
                        }}
                      >
                        Request Sample
                      </button>
                      
                      <button
                        className="btn-secondary"
                        style={{ 
                          flex: 1,
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
                        Save to Routine
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-sub)'
            }}>
              <h3>No strong matches found</h3>
              <p>Try adjusting your preferences or browse our full catalog.</p>
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={resetQuiz}
              className="btn-secondary"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto',
                fontSize: '1rem',
                padding: '0.75rem 1.5rem'
              }}
            >
              <RotateCcw size={16} />
              Retake Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ 
      background: 'var(--white)', 
      padding: '4rem 0' 
    }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Progress Bar */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                Question {currentStep + 1} of {quizSteps.length}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                {Math.round(((currentStep + 1) / quizSteps.length) * 100)}% Complete
              </span>
            </div>
            
            <div style={{
              background: 'var(--bg)',
              borderRadius: '10px',
              height: '8px',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'var(--primary)',
                height: '100%',
                width: `${((currentStep + 1) / quizSteps.length) * 100}%`,
                borderRadius: '10px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Question */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '0.75rem',
              color: 'var(--text-primary)'
            }}>
              {currentQuestion.title}
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: 'var(--text-sub)'
            }}>
              {currentQuestion.subtitle}
            </p>
          </div>

          {/* Options */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: currentQuestion.type === 'multiple' 
              ? 'repeat(auto-fit, minmax(200px, 1fr))' 
              : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            {currentQuestion.options.map(option => {
              const isSelected = currentQuestion.type === 'multiple' 
                ? (answers[currentQuestion.id] || []).includes(option.value)
                : answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => {
                    if (currentQuestion.type === 'multiple') {
                      const current = answers[currentQuestion.id] || [];
                      const newValue = current.includes(option.value)
                        ? current.filter(v => v !== option.value)
                        : [...current, option.value];
                      handleAnswer(currentQuestion.id, newValue);
                    } else {
                      handleAnswer(currentQuestion.id, option.value);
                    }
                  }}
                  style={{
                    padding: '1.5rem',
                    border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    background: isSelected ? 'rgba(0, 195, 255, 0.1)' : 'var(--white)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.background = 'rgba(0, 195, 255, 0.05)';
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
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}>
                    <div style={{ 
                      fontSize: '2rem',
                      lineHeight: 1
                    }}>
                      {option.icon}
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: isSelected ? 'var(--primary)' : 'var(--text-primary)'
                      }}>
                        {option.label}
                      </div>
                      {option.description && (
                        <div style={{ 
                          fontSize: '0.9rem',
                          color: 'var(--text-sub)',
                          lineHeight: 1.4
                        }}>
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: currentStep === 0 ? 'var(--bg)' : 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                opacity: currentStep === 0 ? 0.5 : 1,
                fontSize: '1rem'
              }}
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              onClick={nextStep}
              disabled={!canProceed}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                opacity: canProceed ? 1 : 0.5,
                cursor: canProceed ? 'pointer' : 'not-allowed'
              }}
            >
              {isLastStep ? 'Get My Results' : 'Next'}
              {!isLastStep && <ChevronRight size={20} />}
              {isLastStep && <Target size={20} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFinderQuiz;