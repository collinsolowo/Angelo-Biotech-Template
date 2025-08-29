import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [currentPillar, setCurrentPillar] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  const pillars = [
    {
      icon: '🌿',
      title: 'For Consumers',
      subtitle: 'Premium Organic Wellness',
      description: 'Discover premium, science-backed organic products designed to boost immunity, champion the course of anti-aging, enhance vitality, and support long-term wellness.',
      cta: 'Live healthy. Live naturally.'
    },
    {
      icon: '💼',
      title: 'For Distributors',
      subtitle: 'Build Sustainable Income',
      description: 'Join our fast-growing network across Africa. Earn while promoting wellness. With top-quality products, strong brand support, and real earning potential — this is your gateway to sustainable income.',
      cta: 'Distribute wellness. Build wealth.'
    },
    {
      icon: '📈',
      title: 'For Investors',
      subtitle: 'Future of African Biotech',
      description: 'Be part of the future of health and biotech in Africa. Angelo Biotech is scaling rapidly across borders. Invest in a brand built on trust, results, and regional relevance.',
      cta: 'Invest in health. Grow with us.'
    }
  ];

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextPillar = () => {
    setCurrentPillar((prev) => (prev + 1) % pillars.length);
  };

  const prevPillar = () => {
    setCurrentPillar((prev) => (prev - 1 + pillars.length) % pillars.length);
  };

  return (
    <section id="home" className="hero" role="banner">
      {/* Background Elements */}
      <div className="hero__background">
        {/* Tech Pattern Overlay */}
        <div className="hero__tech-pattern" aria-hidden="true" />
        {/* Color Overlay */}
        <div className="hero__overlay" />
      </div>

      <div className="hero__container">
        <div className="hero__content">
          {/* Brand Section */}
          <div className="hero__brand">
            <h1 className="hero__logo" id="animated-logo">
              <p className="hero-text">Welcome to Angelo Biotech Africa </p>
              <span className="hero__logo-dot" aria-hidden="true"></span>
            </h1>

            <p className="hero__tagline">
              Empowering Africa Through Health, Wellness & Wealth
            </p>

            <p className="hero__mission">
              At Angelo Biotech Africa, we are pioneer in the Anti Aging Industry, we go beyond selling health products — we're building a movement. With a mission rooted in organic wellness, financial empowerment, and global impact, we invite you to be part of something transformational.
            </p>
          </div>

          {/* Three Pillars */}
          {isMobile ? (
            /* Mobile Carousel */
            <div className="hero__pillars-carousel">
              <div className="hero__carousel-container">
                <div className="hero__pillar hero__pillar--active">
                  <div className="hero__pillar-icon" role="img" aria-label={`${pillars[currentPillar].title} icon`}>
                    {pillars[currentPillar].icon}
                  </div>
                  <h2 className="hero__pillar-title">{pillars[currentPillar].title}</h2>
                  <p className="hero__pillar-subtitle">{pillars[currentPillar].subtitle}</p>
                  <p className="hero__pillar-description">{pillars[currentPillar].description}</p>
                  <p className="hero__pillar-cta">{pillars[currentPillar].cta}</p>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="hero__carousel-controls">
                <button
                  className="hero__carousel-btn hero__carousel-btn--prev"
                  onClick={prevPillar}
                  aria-label="Previous pillar"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="hero__carousel-indicators">
                  {pillars.map((_, index) => (
                    <button
                      key={index}
                      className={`hero__carousel-indicator ${index === currentPillar ? 'active' : ''}`}
                      onClick={() => setCurrentPillar(index)}
                      aria-label={`Go to pillar ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  className="hero__carousel-btn hero__carousel-btn--next"
                  onClick={nextPillar}
                  aria-label="Next pillar"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            /* Desktop Grid */
            <div className="hero__pillars">
              {pillars.map((pillar, index) => (
                <div key={index} className="hero__pillar">
                  <div className="hero__pillar-icon" role="img" aria-label={`${pillar.title} icon`}>
                    {pillar.icon}
                  </div>
                  <h2 className="hero__pillar-title">{pillar.title}</h2>
                  <p className="hero__pillar-subtitle">{pillar.subtitle}</p>
                  <p className="hero__pillar-description">{pillar.description}</p>
                  <p className="hero__pillar-cta">{pillar.cta}</p>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="hero__cta-section">
            <a
              href="#contact"
              className="hero__main-cta"
              aria-describedby="main-cta-desc"
            >
              <span>Join Us Today</span>
            </a>

            <div className="hero__closing-message">
              Wellness. Opportunity. Legacy.
            </div>
            <div className="hero__brand-story">
              Be a part of the Angelo Biotech Africa story.
            </div>

            {/* Screen reader description */}
            <div className="sr-only">
              <div id="main-cta-desc">
                Start your journey with Angelo Biotech Africa as a consumer, distributor, or investor
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;