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
          value: 'anti-aging', 
          label: 'Anti-Aging & Longevity', 
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
          value: 'skin-health', 
          label: 'Skin Health & Beauty', 
          icon: '✨', 
          description: 'Healthy, radiant skin' 
        },
        { 
          value: 'digestive-health', 
          label: 'Digestive Wellness', 
          icon: '🌿', 
          description: 'Gut health and detox support' 
        },
        { 
          value: 'daily-care', 
          label: 'Daily Care & Protection', 
          icon: '🏠', 
          description: 'Everyday wellness essentials' 
        },
        { 
          value: 'joint-health', 
          label: 'Joint & Bone Health', 
          icon: '🦴', 
          description: 'Mobility and strength support' 
        },
        { 
          value: 'eye-health', 
          label: 'Eye Health & Protection', 
          icon: '👁️', 
          description: 'Digital eye strain relief' 
        }
      ]
    },
    {
      id: 'format',
      title: 'What format do you prefer?',
      subtitle: 'Choose your preferred delivery method',
      type: 'single',
      options: [
        { value: 'capsule', label: 'Capsules', icon: '💊', description: 'Easy to swallow, precise dosing' },
        { value: 'powder', label: 'Powders', icon: '🥤', description: 'Mix into drinks or food' },
        { value: 'topical', label: 'Topical Products', icon: '🧴', description: 'Creams, oils, sprays' },
        { value: 'device', label: 'Smart Devices', icon: '📱', description: 'Technology-based solutions' },
        { value: 'liquid', label: 'Liquid Supplements', icon: '🍯', description: 'Fast absorption liquids' },
        { value: 'any', label: 'No Preference', icon: '🤷', description: 'Open to all formats' }
      ]
    },
    {
      id: 'preferences',
      title: 'Any specific preferences?',
      subtitle: 'Select all that apply to you',
      type: 'multiple',
      options: [
        { value: 'natural', label: 'Natural Ingredients', icon: '🌱' },
        { value: 'organic', label: 'Organic Certified', icon: '🌿' },
        { value: 'third-party-tested', label: 'Third-Party Tested', icon: '🔬' },
        { value: 'sensitive-skin', label: 'Sensitive Skin Friendly', icon: '🤲' },
        { value: 'eco-friendly', label: 'Eco-Friendly', icon: '♻️' },
        { value: 'fast-acting', label: 'Fast-Acting Results', icon: '⚡' }
      ]
    }
  ];

  const calculateMatches = (userAnswers) => {
    let scoredProducts = products.map(product => {
      let score = 0;
      let maxScore = 0;

      // Goal matching (50% weight)
      maxScore += 50;
      if (userAnswers.goal) {
        const goalMatches = product.goal.filter(goal => 
          goal.toLowerCase().includes(userAnswers.goal.toLowerCase()) ||
          userAnswers.goal.toLowerCase().includes(goal.toLowerCase()) ||
          (userAnswers.goal === 'anti-aging' && (goal.includes('longevity') || goal.includes('cellular'))) ||
          (userAnswers.goal === 'skin-health' && goal.includes('skin')) ||
          (userAnswers.goal === 'digestive-health' && (goal.includes('digestive') || goal.includes('detox')))
        );

        if (goalMatches.length > 0) {
          score += 50 * (goalMatches.length / Math.max(product.goal.length, 1));
        }
      }

      // Format matching (30% weight)
      maxScore += 30;
      if (userAnswers.format && userAnswers.format !== 'any') {
        if (product.format === userAnswers.format) {
          score += 30;
        }
      } else if (userAnswers.format === 'any') {
        score += 15;
      }

      // Preferences matching (20% weight)
      maxScore += 20;
      if (userAnswers.preferences && userAnswers.preferences.length > 0) {
        let preferenceMatches = 0;
        userAnswers.preferences.forEach(preference => {
          const preferenceMap = {
            'natural': ['Natural', 'Herbal'],
            'organic': ['Organic', '100% Pure'],
            'third-party-tested': ['Third-Party Tested', 'Clinically Tested'],
            'sensitive-skin': ['Hypoallergenic', 'Sensitive Skin', 'Gentle'],
            'eco-friendly': ['Eco-Friendly', 'Sustainable'],
            'fast-acting': ['Fast-Acting', 'Quick', 'Instant']
          };

          const requiredBadges = preferenceMap[preference] || [];
          const hasMatch = requiredBadges.some(badge => 
            product.badges.some(productBadge => 
              productBadge.toLowerCase().includes(badge.toLowerCase()) ||
              badge.toLowerCase().includes(productBadge.toLowerCase())
            )
          );

          if (hasMatch) {
            preferenceMatches++;
          }
        });

        if (userAnswers.preferences.length > 0) {
          score += 20 * (preferenceMatches / userAnswers.preferences.length);
        }
      } else {
        score += 10;
      }

      const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

      return {
        ...product,
        matchScore: percentage,
        matchReasons: getMatchReasons(product, userAnswers)
      };
    });

    return scoredProducts
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6)
      .filter(product => product.matchScore > 30);
  };

  const getMatchReasons = (product, userAnswers) => {
    const reasons = [];

    if (userAnswers.goal) {
      const matchingGoals = product.goal.filter(goal => 
        goal.toLowerCase().includes(userAnswers.goal.toLowerCase()) ||
        userAnswers.goal.toLowerCase().includes(goal.toLowerCase())
      );

      if (matchingGoals.length > 0) {
        reasons.push(`Supports ${matchingGoals.slice(0, 2).join(' & ')}`);
      }
    }

    if (userAnswers.format && userAnswers.format !== 'any' && product.format === userAnswers.format) {
      reasons.push(`Available in preferred ${product.format} format`);
    }

    if (userAnswers.preferences) {
      userAnswers.preferences.forEach(preference => {
        const preferenceMap = {
          'natural': ['Natural'],
          'organic': ['Organic'],
          'third-party-tested': ['Third-Party Tested'],
          'sensitive-skin': ['Hypoallergenic'],
          'eco-friendly': ['Eco-Friendly'],
          'fast-acting': ['Fast-Acting']
        };

        const requiredBadges = preferenceMap[preference] || [];
        const matchingBadge = product.badges.find(badge => 
          requiredBadges.some(required => badge.toLowerCase().includes(required.toLowerCase()))
        );

        if (matchingBadge) {
          reasons.push(matchingBadge);
        }
      });
    }

    return reasons.slice(0, 3);
  };

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const matches = calculateMatches(answers);
      setResults(matches);
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
  };

  const currentQuestion = quizSteps[currentStep];
  const isLastStep = currentStep === quizSteps.length - 1;
  const canProceed = answers[currentQuestion?.id];

  if (!isStarted) {
    return (
      <section 
        id="product-finder" 
        className="quiz-intro-section"
      >
        <div className="container">
          <div className="quiz-intro-content">
            <div className="quiz-intro-badge">
              <Target size={32} />
              <h2>Find Your Perfect Products</h2>
            </div>
            
            <p className="quiz-intro-description">
              Answer 3 quick questions to get personalized product recommendations 
              based on your health goals and preferences.
            </p>
            
            <button
              onClick={startQuiz}
              className="quiz-start-btn"
            >
              <Target size={24} />
              Start Product Finder
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (results) {
    return (
      <section className="quiz-results-section">
        <div className="container">
          <div className="results-header">
            <div className="results-badge">
              <Target size={24} />
              Your Personalized Recommendations
            </div>
            
            <p className="results-description">
              Based on your preferences, here are the products that best match your needs:
            </p>
          </div>

          {results.length > 0 ? (
            <div className="results-grid">
              {results.map((product, index) => (
                <div 
                  key={product.id}
                  className={`result-card ${index === 0 ? 'best-match' : ''}`}
                >
                  {index === 0 && (
                    <div className="best-match-badge">
                      🎯 Best Match
                    </div>
                  )}

                  <div className="result-card-content">
                    <div className="match-score" style={{
                      background: product.matchScore >= 80 ? '#059669' : 
                                 product.matchScore >= 60 ? '#F59E0B' : '#00C3FF'
                    }}>
                      {product.matchScore}% Match
                    </div>

                    <img
                      src={product.image}
                      alt={product.title}
                      className="result-image"
                    />

                    <h3 className="result-title">
                      {product.title}
                    </h3>

                    <p className="result-description">
                      {product.description}
                    </p>

                    <div className="match-reasons">
                      <h4>Why this matches you:</h4>
                      <ul>
                        {product.matchReasons.map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="result-badges">
                      {product.badges.slice(0, 3).map(badge => (
                        <span key={badge} className="result-badge">
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="result-actions">
                      <button className="result-btn primary">
                        Request Sample
                      </button>
                      <button className="result-btn secondary">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No strong matches found</h3>
              <p>Try adjusting your preferences or browse our full catalog.</p>
            </div>
          )}

          <div className="results-footer">
            <button
              onClick={resetQuiz}
              className="retake-btn"
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
    <section className="quiz-section">
      <div className="container">
        <div className="quiz-container">
          {/* Progress Bar */}
          <div className="quiz-progress">
            <div className="progress-info">
              <span>Question {currentStep + 1} of {quizSteps.length}</span>
              <span>{Math.round(((currentStep + 1) / quizSteps.length) * 100)}% Complete</span>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: `${((currentStep + 1) / quizSteps.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="quiz-question">
            <h2>{currentQuestion.title}</h2>
            <p>{currentQuestion.subtitle}</p>
          </div>

          {/* Options */}
          <div className={`quiz-options ${currentQuestion.type === 'multiple' ? 'multiple' : 'single'}`}>
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
                  className={`quiz-option ${isSelected ? 'selected' : ''}`}
                >
                  <div className="option-content">
                    <div className="option-icon">
                      {option.icon}
                    </div>
                    <div className="option-text">
                      <div className="option-label">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="option-description">
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
          <div className="quiz-navigation">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="nav-btn back"
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              onClick={nextStep}
              disabled={!canProceed}
              className="nav-btn next"
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