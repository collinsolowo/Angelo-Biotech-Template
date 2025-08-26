import React, { useState, useEffect } from 'react';
import '../styles/AboutPage.css';
import Navbar from './Navbar';
import Footer from './Footer/Footer';

// Optional Framer Motion import - remove if not using
// import { motion } from 'framer-motion';

// Content data array for easy content management
const aboutSections = [
  {
    id: 'who',
    title: 'Who We Are',
    content: '<!-- REPLACE_WITH_USER_CONTENT -->We are pioneers in health technology, dedicated to creating innovative solutions that transform lives through science-backed wellness products.',
    image: '/images/about-hero.jpg', // <!-- REPLACE_WITH_USER_CONTENT -->
    kicker: 'Transforming lives through innovation'
  },
  {
    id: 'mission',
    title: 'Mission & Vision',
    mission: '<!-- REPLACE_WITH_USER_CONTENT -->To democratize access to premium health solutions through cutting-edge research and technology.',
    vision: '<!-- REPLACE_WITH_USER_CONTENT -->A world where everyone has access to personalized, science-backed wellness solutions that enhance quality of life.',
    stat: { label: 'Years of Innovation', value: '15+' }
  },
  {
    id: 'pillars',
    title: 'Our Core Values',
    items: [
      { icon: '🔬', title: 'Scientific Excellence', body: '<!-- REPLACE_WITH_USER_CONTENT -->Rigorous research and clinical testing drive every product decision.' },
      { icon: '🌱', title: 'Sustainable Innovation', body: '<!-- REPLACE_WITH_USER_CONTENT -->Environmental responsibility shapes our manufacturing and packaging.' },
      { icon: '🤝', title: 'Customer First', body: '<!-- REPLACE_WITH_USER_CONTENT -->Your health journey guides our product development priorities.' },
      { icon: '🎯', title: 'Quality Assurance', body: '<!-- REPLACE_WITH_USER_CONTENT -->Premium ingredients and manufacturing standards in every product.' },
      { icon: '💡', title: 'Continuous Learning', body: '<!-- REPLACE_WITH_USER_CONTENT -->Always evolving based on latest scientific discoveries.' },
      { icon: '🌍', title: 'Global Impact', body: '<!-- REPLACE_WITH_USER_CONTENT -->Making wellness accessible to communities worldwide.' }
    ]
  },
  {
    id: 'leadership',
    title: 'Our Leadership Team',
    team: [
      {
        name: '<!-- REPLACE_WITH_USER_CONTENT -->Dr. Sarah Johnson',
        role: 'Chief Executive Officer',
        avatar: '/images/team/ceo.jpg', // <!-- REPLACE_WITH_USER_CONTENT -->
        quote: 'Innovation happens when science meets compassion.'
      },
      {
        name: '<!-- REPLACE_WITH_USER_CONTENT -->Dr. Michael Chen',
        role: 'Chief Technology Officer',
        avatar: '/images/team/cto.jpg', // <!-- REPLACE_WITH_USER_CONTENT -->
        quote: 'Technology should enhance human potential, not replace it.'
      },
      {
        name: '<!-- REPLACE_WITH_USER_CONTENT -->Dr. Elena Rodriguez',
        role: 'Head of Research',
        avatar: '/images/team/research.jpg', // <!-- REPLACE_WITH_USER_CONTENT -->
        quote: 'Every breakthrough starts with a question and ends with impact.'
      },
      {
        name: '<!-- REPLACE_WITH_USER_CONTENT -->James Wilson',
        role: 'VP of Operations',
        avatar: '/images/team/ops.jpg', // <!-- REPLACE_WITH_USER_CONTENT -->
        quote: 'Excellence is in the details of execution.'
      }
    ]
  },
  {
    id: 'reach',
    title: 'Global Presence',
    offices: [
      {
        city: '<!-- REPLACE_WITH_USER_CONTENT -->San Francisco, CA',
        address: '123 Innovation Drive',
        contact: 'sf@company.com'
      },
      {
        city: '<!-- REPLACE_WITH_USER_CONTENT -->London, UK',
        address: '456 Science Park',
        contact: 'london@company.com'
      },
      {
        city: '<!-- REPLACE_WITH_USER_CONTENT -->Tokyo, Japan',
        address: '789 Tech Center',
        contact: 'tokyo@company.com'
      },
      {
        city: '<!-- REPLACE_WITH_USER_CONTENT -->Sydney, Australia',
        address: '321 Research Blvd',
        contact: 'sydney@company.com'
      }
    ]
  },
  {
    id: 'cta',
    title: 'Join Our Mission',
    content: '<!-- REPLACE_WITH_USER_CONTENT -->Ready to make a difference in global wellness? We are always looking for passionate individuals who share our vision.',
    cta: { label: 'View Open Positions', to: '/careers' },
    newsletter: true
  }
];

const AboutPage = () => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [animateOnScroll, setAnimateOnScroll] = useState([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimateOnScroll(prev => [...new Set([...prev, entry.target.id])]);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Team navigation handlers
  const handleTeamNavigation = (direction) => {
    const team = aboutSections.find(s => s.id === 'leadership')?.team || [];
    if (direction === 'next') {
      setCurrentTeamIndex((prev) => (prev + 1) % team.length);
    } else {
      setCurrentTeamIndex((prev) => (prev - 1 + team.length) % team.length);
    }
  };

  // Keyboard navigation for team slider
  const handleTeamKeyDown = (e, direction) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTeamNavigation(direction);
    }
  };

  const heroData = aboutSections.find(s => s.id === 'who');
  const missionData = aboutSections.find(s => s.id === 'mission');
  const pillarsData = aboutSections.find(s => s.id === 'pillars');
  const leadershipData = aboutSections.find(s => s.id === 'leadership');
  const reachData = aboutSections.find(s => s.id === 'reach');
  const ctaData = aboutSections.find(s => s.id === 'cta');

  return (
    <>
    <Navbar/>
      <main className="about-page" id="main-content">
        {/* Hero Section */}
        <section
          id="about-hero"
          className="about-hero"
          data-animate
          aria-labelledby="hero-heading"
        >
          <div className="about-hero__container">
            <div className={`about-hero__content ${animateOnScroll.includes('about-hero') ? 'animate-fade-up' : ''}`}>
              <header>
                <p className="about-hero__kicker" aria-label="Company tagline">
                  {heroData?.kicker}
                </p>
                <h1 id="hero-heading" className="about-hero__title">
                  {heroData?.title}
                </h1>
                <p className="about-hero__description">
                  {heroData?.content}
                </p>
              </header>
            </div>
            <div className={`about-hero__image ${animateOnScroll.includes('about-hero') ? 'animate-fade-left' : ''}`}>
              <img
                src={heroData?.image}
                alt="<!-- REPLACE_WITH_USER_CONTENT -->Team collaboration in modern office"
                loading="eager"
                srcSet={`${heroData?.image} 1x, ${heroData?.image?.replace('.jpg', '@2x.jpg')} 2x`}
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section
          id="about-mission"
          className="about-mission"
          data-animate
          aria-labelledby="mission-heading"
        >
          <div className="about-mission__container">
            <div className={`about-mission__stat ${animateOnScroll.includes('about-mission') ? 'animate-fade-up' : ''}`}>
              <div className="about-mission__stat-number" aria-label={`${missionData?.stat.value} ${missionData?.stat.label}`}>
                {missionData?.stat.value}
              </div>
              <div className="about-mission__stat-label">
                {missionData?.stat.label}
              </div>
              <div className="about-mission__mission">
                <h2 id="mission-heading" className="sr-only">Our Mission</h2>
                <p>{missionData?.mission}</p>
              </div>
            </div>
            <div className={`about-mission__vision ${animateOnScroll.includes('about-mission') ? 'animate-fade-up animate-delay-200' : ''}`}>
              <div className="about-mission__vision-icon" aria-hidden="true">🚀</div>
              <h3>Our Vision</h3>
              <p>{missionData?.vision}</p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section
          id="about-pillars"
          className="about-pillars"
          data-animate
          aria-labelledby="pillars-heading"
        >
          <div className="about-pillars__container">
            <header className={`about-pillars__header ${animateOnScroll.includes('about-pillars') ? 'animate-fade-up' : ''}`}>
              <h2 id="pillars-heading">{pillarsData?.title}</h2>
            </header>
            <div className="about-pillars__grid" role="list">
              {pillarsData?.items.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className={`about-pillars__item ${animateOnScroll.includes('about-pillars') ? `animate-fade-up animate-delay-${(index + 1) * 100}` : ''}`}
                  role="listitem"
                >
                  <div className="about-pillars__icon" aria-hidden="true">
                    {pillar.icon}
                  </div>
                  <h3 className="about-pillars__title">{pillar.title}</h3>
                  <p className="about-pillars__body">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section
          id="about-leadership"
          className="about-leadership"
          data-animate
          aria-labelledby="leadership-heading"
        >
          <div className="about-leadership__container">
            <header className={`about-leadership__header ${animateOnScroll.includes('about-leadership') ? 'animate-fade-up' : ''}`}>
              <h2 id="leadership-heading">{leadershipData?.title}</h2>
            </header>

            {/* Desktop Grid */}
            <div className="about-leadership__grid about-leadership__desktop" role="list">
              {leadershipData?.team.map((leader, index) => (
                <div
                  key={leader.name}
                  className={`about-leadership__card ${animateOnScroll.includes('about-leadership') ? `animate-fade-up animate-delay-${(index + 1) * 150}` : ''}`}
                  role="listitem"
                >
                  <img
                    src={leader.avatar}
                    alt={`<!-- REPLACE_WITH_USER_CONTENT -->${leader.name}, ${leader.role}`}
                    className="about-leadership__avatar"
                    loading="lazy"
                  />
                  <h3 className="about-leadership__name">{leader.name}</h3>
                  <p className="about-leadership__role">{leader.role}</p>
                  <blockquote className="about-leadership__quote">
                    "{leader.quote}"
                  </blockquote>
                </div>
              ))}
            </div>

            {/* Mobile Slider */}
            <div className="about-leadership__slider about-leadership__mobile" role="region" aria-label="Leadership team profiles">
              <div className="about-leadership__card">
                <img
                  src={leadershipData?.team[currentTeamIndex]?.avatar}
                  alt={`<!-- REPLACE_WITH_USER_CONTENT -->${leadershipData?.team[currentTeamIndex]?.name}, ${leadershipData?.team[currentTeamIndex]?.role}`}
                  className="about-leadership__avatar"
                  loading="lazy"
                />
                <h3 className="about-leadership__name">{leadershipData?.team[currentTeamIndex]?.name}</h3>
                <p className="about-leadership__role">{leadershipData?.team[currentTeamIndex]?.role}</p>
                <blockquote className="about-leadership__quote">
                  "{leadershipData?.team[currentTeamIndex]?.quote}"
                </blockquote>
              </div>
              <div className="about-leadership__controls">
                <button
                  onClick={() => handleTeamNavigation('prev')}
                  onKeyDown={(e) => handleTeamKeyDown(e, 'prev')}
                  className="about-leadership__nav about-leadership__nav--prev"
                  aria-label="Previous team member"
                >
                  ←
                </button>
                <div className="about-leadership__indicators" role="tablist">
                  {leadershipData?.team.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTeamIndex(index)}
                      className={`about-leadership__indicator ${index === currentTeamIndex ? 'active' : ''}`}
                      role="tab"
                      aria-selected={index === currentTeamIndex}
                      aria-label={`View ${leadershipData.team[index].name}'s profile`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleTeamNavigation('next')}
                  onKeyDown={(e) => handleTeamKeyDown(e, 'next')}
                  className="about-leadership__nav about-leadership__nav--next"
                  aria-label="Next team member"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Global Reach Section */}
        <section
          id="about-reach"
          className="about-reach"
          data-animate
          aria-labelledby="reach-heading"
        >
          <div className="about-reach__container">
            <header className={`about-reach__header ${animateOnScroll.includes('about-reach') ? 'animate-fade-up' : ''}`}>
              <h2 id="reach-heading">{reachData?.title}</h2>
              <div className="about-reach__map" aria-hidden="true">
                {/* <!-- REPLACE_WITH_USER_CONTENT -->Replace with actual world map SVG or image */}
                <div className="about-reach__map-placeholder">🌍</div>
              </div>
            </header>

            <div className="about-reach__offices" role="list">
              {reachData?.offices.map((office, index) => (
                <div
                  key={office.city}
                  className={`about-reach__office ${animateOnScroll.includes('about-reach') ? `animate-fade-up animate-delay-${(index + 1) * 100}` : ''}`}
                  role="listitem"
                >
                  <h3 className="about-reach__city">{office.city}</h3>
                  <address className="about-reach__address">
                    {office.address}
                  </address>
                  <a
                    href={`mailto:${office.contact}`}
                    className="about-reach__contact"
                    aria-label={`Email ${office.city} office`}
                  >
                    {office.contact}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="about-cta"
          className="about-cta"
          data-animate
          aria-labelledby="cta-heading"
        >
          <div className="about-cta__container">
            <div className={`about-cta__content ${animateOnScroll.includes('about-cta') ? 'animate-fade-up' : ''}`}>
              <h2 id="cta-heading">{ctaData?.title}</h2>
              <p>{ctaData?.content}</p>

              <div className="about-cta__actions">
                <a
                  href={ctaData?.cta.to}
                  className="btn-primary about-cta__button"
                  role="button"
                >
                  {ctaData?.cta.label}
                </a>
              </div>
            </div>

            {ctaData?.newsletter && (
              <div className={`about-cta__newsletter ${animateOnScroll.includes('about-cta') ? 'animate-fade-up animate-delay-200' : ''}`}>
                <h3>Stay Connected</h3>
                <form className="about-cta__form" aria-label="Newsletter signup">
                  <div className="about-cta__form-group">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="newsletter-email"
                      placeholder="Enter your email"
                      className="about-cta__input"
                      required
                      aria-describedby="email-error"
                    />
                    <div id="email-error" className="about-cta__error" role="alert" aria-live="polite">
                      {/* Error messages will appear here */}
                    </div>
                  </div>
                  <button type="submit" className="btn-secondary about-cta__submit">
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default AboutPage;