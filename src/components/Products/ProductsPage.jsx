import React, { useState, useEffect } from 'react';
import { Play, ChevronRight, ChevronLeft, Sparkles, Shield, Target, Package } from 'lucide-react';
import productsData from '../../data/products.json';
import '../../styles/ProductsPage.css';
import ProductFinderQuiz from './ProductFinderQuiz'
import Navbar from '../Navbar';
import Footer from '../Footer/Footer';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlides, setCurrentSlides] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setProducts(productsData);
            setLoading(false);

            // Initialize slide positions for mobile carousels
            const initialSlides = {};
            productsData.forEach(product => {
                initialSlides[product.id] = 0;
            });
            setCurrentSlides(initialSlides);
        }, 500);
    }, []);

    const categories = {
        'Daily Care': {
            icon: Sparkles,
            color: '#7C4DFF',
            gradient: 'linear-gradient(135deg, #7C4DFF 0%, #9C27B0 100%)',
            description: 'Essential products for your daily wellness routine'
        },
        'Supplement Products': {
            icon: Target,
            color: '#00C3FF',
            gradient: 'linear-gradient(135deg, #00C3FF 0%, #0099CC 100%)',
            description: 'Advanced supplements for optimal health and longevity'
        },
        'Detox & Sanitary': {
            icon: Shield,
            color: '#059669',
            gradient: 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
            description: 'Clean and safe solutions for a healthier environment'
        }
    };

    const getProductsByCategory = (category) => {
        return products.filter(product => product.category === category);
    };

    const nextSlide = (productId) => {
        setCurrentSlides(prev => ({
            ...prev,
            [productId]: (prev[productId] + 1) % 3
        }));
    };

    const prevSlide = (productId) => {
        setCurrentSlides(prev => ({
            ...prev,
            [productId]: prev[productId] === 0 ? 2 : prev[productId] - 1
        }));
    };


    const ProductRow = ({ product, index, categoryInfo }) => {
        const currentSlide = currentSlides[product.id] || 0;

        const slideContent = [
            // Image slide
            <div key="image" className="product-slide">
                <div className="product-image-container">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                    />
                    <div className="category-badge" style={{
                        background: categoryInfo.gradient
                    }}>
                        {product.category}
                    </div>
                </div>
            </div>,

            // Info slide
            <div key="info" className="product-slide">
                <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-description">{product.description}</p>

                    <div className="key-benefits">
                        <h4>Key Benefits</h4>
                        <ul>
                            {product.keyBenefits.slice(0, 4).map((benefit, idx) => (
                                <li key={idx}>
                                    <span className="benefit-dot" style={{
                                        background: categoryInfo.color
                                    }}></span>
                                    {benefit.split(':')[0]}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="product-features">
                        {product.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="feature-tag" style={{
                                background: `${categoryInfo.color}15`,
                                color: categoryInfo.color
                            }}>
                                {feature}
                            </span>
                        ))}
                    </div>

                    <button className="learn-more-btn" style={{
                        background: categoryInfo.gradient
                    }}>
                        Learn More
                        <ChevronRight size={18} color="#fff" />
                    </button>
                </div>
            </div>,

            // Video slide
            <div key="video" className="product-slide">
                <div className="product-video-container">
                    <video
                        className="product-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={product.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="video-overlay">
                        <div className="play-indicator">
                            <Play size={24} color="#333" />
                        </div>
                    </div>
                </div>
            </div>
        ];

        const slideCount = slideContent.length;

        // clone slides and force each slide to take equal width of the track
        const slidesWithWidth = slideContent.map((slide, idx) =>
            React.cloneElement(slide, {
                key: idx,
                style: { width: `${100 / slideCount}%`, minWidth: `${100 / slideCount}%` }
            })
        );

        return (
            <div className="product-row" style={{
                animationDelay: `${index * 0.1}s`
            }}>
                {/* Desktop Layout */}
                <div className="desktop-layout">
                    {slideContent}
                </div>

                {/* Mobile Carousel */}
                <div className="mobile-carousel">
                    <div className="carousel-container">
                        <div
                            className="carousel-track"
                            style={{
                                width: `${slideCount * 100}%`,
                                transform: `translateX(-${currentSlide * (100 / slideCount)}%)`
                            }}
                        >
                            {slidesWithWidth}
                        </div>
                    </div>

                    <div className="carousel-controls">
                        <button
                            className="carousel-btn prev"
                            onClick={() => prevSlide(product.id)}
                            aria-label="Previous"
                        >
                            <ChevronLeft size={20} color="#fff" />
                        </button>

                        <div className="carousel-dots">
                            {[...Array(slideCount)].map((_, dot) => (
                                <button
                                    key={dot}
                                    className={`carousel-dot ${currentSlide === dot ? 'active' : ''}`}
                                    onClick={() => setCurrentSlides(prev => ({
                                        ...prev,
                                        [product.id]: dot
                                    }))}
                                    style={{
                                        background: currentSlide === dot ? categoryInfo.color : '#e2e8f0'
                                    }}
                                    aria-label={`Go to slide ${dot + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            className="carousel-btn next"
                            onClick={() => nextSlide(product.id)}
                            aria-label="Next"
                        >
                            <ChevronRight size={20} color="#fff" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const CategorySection = ({ categoryName, categoryProducts }) => {
        const categoryInfo = categories[categoryName];
        const Icon = categoryInfo.icon;

        return (
            <section className="category-section" style={{
                background: categoryName === 'Supplement Products' ?
                    'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' :
                    'white'
            }}>
                <div className="container">
                    {/* Section Header */}
                    <div className="section-header">
                        <div className="category-header-container">
                            {/* FIX: Add proper category header with icon and title */}
                            <Icon size={32} color={categoryInfo.color} />
                            <h2 className="category-title" style={{
                                color: categoryInfo.color
                            }}>
                                {categoryName}
                            </h2>
                        </div>

                        <p className="category-description">
                            {categoryInfo.description}
                        </p>
                    </div>

                    {/* Products Column */}
                    <div className="products-column">
                        {categoryProducts.map((product, index) => (
                            <ProductRow
                                key={product.id}
                                product={product}
                                index={index}
                                categoryInfo={categoryInfo}
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner" />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="products-main">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-background" />

                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-text">
                                <div className="hero-badge">
                                    ✨ Premium Health & Wellness Products
                                </div>

                                <h1 className="hero-title">
                                    Science-Backed Solutions for Modern Living
                                </h1>

                                <p className="hero-description">
                                    Discover our comprehensive range of premium products designed to enhance your daily wellness routine, from advanced supplements to innovative care solutions.
                                </p>

                                <div className="hero-buttons">
                                    <button
                                        className="hero-btn primary"
                                        onClick={() => document.getElementById('daily-care')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Explore Products
                                        <ChevronRight size={18} />
                                    </button>

                                    <button
                                        className="hero-btn secondary"
                                        onClick={() => document.getElementById('product-finder')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Find My Product
                                    </button>
                                </div>
                            </div>

                            <div className="hero-visual">
                                <div className="hero-circle">
                                    <img
                                        src="https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg"
                                        alt="Premium wellness products"
                                        className="hero-image"
                                    />

                                    <div className="floating-badge natural">
                                        <Package size={16} />
                                        Natural
                                    </div>

                                    <div className="floating-badge safe">
                                        <Shield size={16} />
                                        Safe
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Categories */}
                {Object.keys(categories).map(categoryName => {
                    const categoryProducts = getProductsByCategory(categoryName);
                    return categoryProducts.length > 0 ? (
                        <CategorySection
                            key={categoryName}
                            categoryName={categoryName}
                            categoryProducts={categoryProducts}
                        />
                    ) : null;
                })}

                {/* Product Finder Quiz */}
                <ProductFinderQuiz products={products} />

                {/* Newsletter Section */}
                <section className="newsletter-section">
                    <div className="container">
                        <div className="newsletter-content">
                            <h2>Stay Updated with Angelo</h2>
                            <p>
                                Get the latest product updates, health tips, and exclusive offers delivered to your inbox.
                            </p>

                            <form className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="newsletter-input"
                                />
                                <button
                                    type="submit"
                                    className="newsletter-btn"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default ProductsPage;