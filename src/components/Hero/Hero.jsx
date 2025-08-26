import React from 'react';
import './Hero.css';

const Hero = () => {
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
              <span className="hero__logo-text">
                <span className="hero__logo-letter" style={{ '--delay': '0s' }}>W</span>
                <span className="hero__logo-letter" style={{ '--delay': '0.1s' }}>e</span>
                <span className="hero__logo-letter" style={{ '--delay': '0.2s' }}>l</span>
                <span className="hero__logo-letter" style={{ '--delay': '0.3s' }}>c</span>
                <span className="hero__logo-letter" style={{ '--delay': '0.4s' }}>o</span>
                <span className="hero__logo-letter" style={{ '--delay': '0.5s' }}>m</span>
                <span className="hero__logo-letter" style={{ '--delay': '0.6s' }}>e</span>
                <span className="hero__logo-space"> </span>

                <span className="hero__logo-letter" style={{ '--delay': '0.7s' }}>t</span>
                <span className="hero__logo-letter" style={{ '--delay': '0.8s' }}>o</span>
                <span className="hero__logo-space"> </span>

                <span className="hero__logo-letter" style={{ '--delay': '0.9s' }}>A</span>
                <span className="hero__logo-letter" style={{ '--delay': '1.0s' }}>n</span>
                <span className="hero__logo-letter" style={{ '--delay': '1.1s' }}>g</span>
                <span className="hero__logo-letter" style={{ '--delay': '1.2s' }}>e</span>
                <span className="hero__logo-letter" style={{ '--delay': '1.3s' }}>l</span>
                <span className="hero__logo-letter" style={{ '--delay': '1.4s' }}>o</span>
                <span className="hero__logo-space"> </span>

                <span className="hero__logo-letter" style={{ '--delay': '1.5s' }}>B</span>
                <span className="hero__logo-letter" style={{ '--delay': '1.6s' }}>i</span>
                <span className="hero__logo-letter" style={{ '--delay': '1.7s' }}>o</span>
                <span className="hero__logo-letter" style={{ '--delay': '1.8s' }}>t</span>
                <span className="hero__logo-letter" style={{ '--delay': '1.9s' }}>e</span>
                <span className="hero__logo-letter" style={{ '--delay': '2.0s' }}>c</span>
                <span className="hero__logo-letter" style={{ '--delay': '2.1s' }}>h</span>
                <span className="hero__logo-space"> </span>

                <span className="hero__logo-letter" style={{ '--delay': '2.2s' }}>A</span>
                <span className="hero__logo-letter" style={{ '--delay': '2.3s' }}>f</span>
                <span className="hero__logo-letter" style={{ '--delay': '2.4s' }}>r</span>
                <span className="hero__logo-letter" style={{ '--delay': '2.5s' }}>i</span>
                <span className="hero__logo-letter" style={{ '--delay': '2.6s' }}>c</span>
                <span className="hero__logo-letter" style={{ '--delay': '2.7s' }}>a</span>
              </span>
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
          <div className="hero__pillars">
            {/* For Consumers */}
            <div className="hero__pillar">
              <div className="hero__pillar-icon" role="img" aria-label="Wellness icon">🌿</div>
              <h2 className="hero__pillar-title">For Consumers</h2>
              <p className="hero__pillar-subtitle">Premium Organic Wellness</p>
              <p className="hero__pillar-description">
                Discover premium, science-backed organic products designed to boost immunity,
                champion the course of anti-aging, enhance vitality, and support long-term wellness.
              </p>
              <p className="hero__pillar-cta">Live healthy. Live naturally.</p>
            </div>

            {/* For Distributors */}
            <div className="hero__pillar">
              <div className="hero__pillar-icon" role="img" aria-label="Business icon">💼</div>
              <h2 className="hero__pillar-title">For Distributors</h2>
              <p className="hero__pillar-subtitle">Build Sustainable Income</p>
              <p className="hero__pillar-description">
                Join our fast-growing network across Africa. Earn while promoting wellness.
                With top-quality products, strong brand support, and real earning potential —
                this is your gateway to sustainable income.
              </p>
              <p className="hero__pillar-cta">Distribute wellness. Build wealth.</p>
            </div>

            {/* For Investors */}
            <div className="hero__pillar">
              <div className="hero__pillar-icon" role="img" aria-label="Growth icon">📈</div>
              <h2 className="hero__pillar-title">For Investors</h2>
              <p className="hero__pillar-subtitle">Future of African Biotech</p>
              <p className="hero__pillar-description">
                Be part of the future of health and biotech in Africa. Angelo Biotech is scaling
                rapidly across borders. Invest in a brand built on trust, results, and regional relevance.
              </p>
              <p className="hero__pillar-cta">Invest in health. Grow with us.</p>
            </div>
          </div>

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