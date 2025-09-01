import React, { useState } from 'react';
import { Target, ChevronRight, ChevronLeft, RotateCcw, Sparkles } from 'lucide-react';

const ProductFinderQuiz = ({ products }) => {
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 'primaryGoal',
            question: 'What is your primary health goal?',
            description: 'Select the area you want to focus on most',
            type: 'single',
            options: [
                { value: 'longevity', label: 'Longevity & Anti-Aging', icon: '🧬', description: 'Extend healthspan and slow aging' },
                { value: 'energy', label: 'Energy & Vitality', icon: '⚡', description: 'Boost daily energy levels' },
                { value: 'immunity', label: 'Immune Support', icon: '🛡️', description: 'Strengthen immune system' },
                { value: 'cognitive', label: 'Brain Health', icon: '🧠', description: 'Enhance mental clarity and focus' },
                { value: 'beauty', label: 'Beauty & Skin Care', icon: '✨', description: 'Improve skin health and appearance' },
                { value: 'wellness', label: 'General Wellness', icon: '🌿', description: 'Overall health maintenance' }
            ]
        },
        {
            id: 'format',
            question: 'What format do you prefer?',
            description: 'Choose your preferred product format',
            type: 'single',
            options: [
                { value: 'capsule', label: 'Capsules', icon: '💊', description: 'Easy to take, precise dosing' },
                { value: 'powder', label: 'Powders', icon: '🥄', description: 'Mix into drinks or food' },
                { value: 'cream', label: 'Creams & Topicals', icon: '🧴', description: 'Direct skin application' },
                { value: 'device', label: 'Devices', icon: '📱', description: 'Technology-based solutions' },
                { value: 'liquid', label: 'Liquids', icon: '💧', description: 'Fast absorption' }
            ]
        },
        {
            id: 'lifestyle',
            question: 'Which describes your lifestyle?',
            description: 'Help us understand your daily routine',
            type: 'multiple',
            options: [
                { value: 'busy', label: 'Very Busy', icon: '⏰', description: 'Need quick, convenient solutions' },
                { value: 'active', label: 'Physically Active', icon: '🏃', description: 'Regular exercise routine' },
                { value: 'tech', label: 'Tech-Savvy', icon: '💻', description: 'Love innovative solutions' },
                { value: 'natural', label: 'Natural Living', icon: '🌱', description: 'Prefer organic, natural products' },
                { value: 'wellness', label: 'Wellness Focused', icon: '🧘', description: 'Prioritize health and self-care' }
            ]
        }
    ];

    const handleAnswer = (questionId, value, isMultiple = false) => {
        if (isMultiple) {
            const currentAnswers = answers[questionId] || [];
            const newAnswers = currentAnswers.includes(value)
                ? currentAnswers.filter(v => v !== value)
                : [...currentAnswers, value];
            setAnswers(prev => ({ ...prev, [questionId]: newAnswers }));
        } else {
            setAnswers(prev => ({ ...prev, [questionId]: value }));
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
        setShowQuiz(false);
    };

    const calculateMatches = () => {
        const userGoals = answers.primaryGoal ? [answers.primaryGoal] : [];
        const userFormat = answers.format;
        const userLifestyle = answers.lifestyle || [];

        const scoredProducts = products.map(product => {
            let score = 0;
            const reasons = [];

            // Goal matching
            if (userGoals.some(goal => product.goal.includes(goal))) {
                score += 40;
                reasons.push('Matches your primary health goal');
            }

            // Format matching
            if (userFormat && product.format === userFormat) {
                score += 30;
                reasons.push('Available in your preferred format');
            }

            // Lifestyle matching
            const lifestyleKeywords = {
                busy: ['quick', 'convenient', 'easy', 'simple'],
                active: ['energy', 'performance', 'recovery', 'endurance'],
                tech: ['advanced', 'innovative', 'technology'],
                natural: ['natural', 'organic', 'plant-based'],
                wellness: ['wellness', 'health', 'balance']
            };

            userLifestyle.forEach(lifestyle => {
                const keywords = lifestyleKeywords[lifestyle] || [];
                const productText = `${product.title} ${product.description} ${product.features.join(' ')}`.toLowerCase();
                
                if (keywords.some(keyword => productText.includes(keyword))) {
                    score += 15;
                    reasons.push(`Fits your ${lifestyle} lifestyle`);
                }
            });

            // Bonus for multiple benefits
            if (product.keyBenefits.length >= 4) {
                score += 10;
                reasons.push('Comprehensive benefits');
            }

            return {
                ...product,
                matchScore: Math.min(score, 100),
                matchReasons: reasons
            };
        });

        return scoredProducts
            .filter(product => product.matchScore > 0)
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 6);
    };

    const currentQ = questions[currentQuestion];
    const canProceed = answers[currentQ?.id] && 
        (currentQ?.type !== 'multiple' || (answers[currentQ?.id] && answers[currentQ?.id].length > 0));

    if (!showQuiz) {
        return (
            <section id="product-finder" className="quiz-intro-section">
                <div className="container">
                    <div className="quiz-intro-content">
                        <div className="quiz-intro-badge">
                            <Target size={32} />
                            <h2>Find Your Perfect Product</h2>
                        </div>
                        <p className="quiz-intro-description">
                            Take our personalized quiz to discover products tailored to your unique health goals and lifestyle preferences.
                        </p>
                        <button 
                            className="quiz-start-btn"
                            onClick={() => setShowQuiz(true)}
                        >
                            Start Quiz
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (showResults) {
        const matches = calculateMatches();
        
        return (
            <section className="quiz-results-section">
                <div className="container">
                    <div className="results-header">
                        <div className="results-badge">
                            <Sparkles size={24} />
                            Your Personalized Recommendations
                        </div>
                        <p className="results-description">
                            Based on your preferences, here are the products that best match your needs.
                        </p>
                    </div>

                    {matches.length > 0 ? (
                        <div className="results-grid">
                            {matches.map((product, index) => (
                                <div 
                                    key={product.id} 
                                    className={`result-card ${index === 0 ? 'best-match' : ''}`}
                                >
                                    {index === 0 && (
                                        <div className="best-match-badge">
                                            🏆 Best Match
                                        </div>
                                    )}
                                    
                                    <div 
                                        className="match-score"
                                        style={{
                                            background: index === 0 ? '#059669' : 
                                                       product.matchScore >= 70 ? '#0891B2' : 
                                                       product.matchScore >= 50 ? '#7C4DFF' : '#6B7280'
                                        }}
                                    >
                                        {product.matchScore}% Match
                                    </div>

                                    <div className="result-card-content">
                                        <img 
                                            src={product.image} 
                                            alt={product.title}
                                            className="result-image"
                                            onError={(e) => {
                                                e.target.src = 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg';
                                            }}
                                        />
                                        
                                        <h3 className="result-title">{product.title}</h3>
                                        <p className="result-description">{product.description}</p>
                                        
                                        <div className="match-reasons">
                                            <h4>Why this matches you:</h4>
                                            <ul>
                                                {product.matchReasons.map((reason, idx) => (
                                                    <li key={idx}>{reason}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="result-badges">
                                            {product.goal.slice(0, 3).map((goal, idx) => (
                                                <span key={idx} className="result-badge">
                                                    {goal}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="result-actions">
                                            <button className="result-btn primary">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>No perfect matches found. Try adjusting your preferences or explore all our products above.</p>
                        </div>
                    )}

                    <div className="results-footer">
                        <button className="retake-btn" onClick={resetQuiz}>
                            <RotateCcw size={18} />
                            Take Quiz Again
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
                    {/* Progress */}
                    <div className="quiz-progress">
                        <div className="progress-info">
                            <span>Question {currentQuestion + 1} of {questions.length}</span>
                            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Question */}
                    <div className="quiz-question">
                        <h2>{currentQ.question}</h2>
                        <p>{currentQ.description}</p>
                    </div>

                    {/* Options */}
                    <div className={`quiz-options ${currentQ.type}`}>
                        {currentQ.options.map(option => {
                            const isSelected = currentQ.type === 'multiple' 
                                ? (answers[currentQ.id] || []).includes(option.value)
                                : answers[currentQ.id] === option.value;

                            return (
                                <div
                                    key={option.value}
                                    className={`quiz-option ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleAnswer(currentQ.id, option.value, currentQ.type === 'multiple')}
                                >
                                    <div className="option-content">
                                        <div className="option-icon">{option.icon}</div>
                                        <div className="option-text">
                                            <div className="option-label">{option.label}</div>
                                            <div className="option-description">{option.description}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation */}
                    <div className="quiz-navigation">
                        <button 
                            className="nav-btn back"
                            onClick={prevQuestion}
                            disabled={currentQuestion === 0}
                        >
                            <ChevronLeft size={18} />
                            Back
                        </button>

                        <button 
                            className="nav-btn next"
                            onClick={nextQuestion}
                            disabled={!canProceed}
                        >
                            {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductFinderQuiz;