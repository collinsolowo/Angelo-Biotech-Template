// OurTeam.jsx - Updated with accessibility improvements
import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Homepage.css';

const DEFAULT_TEAM = [
  {
    id: 't1',
    name: 'Dr. Amina Bello',
    role: 'Chief Scientific Officer',
    tagline: 'Leading translational research & product science',
    bio: 'Molecular biologist with 14+ years in translational research, nutraceutical formulation and clinical partnerships.',
    img: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
    imgAlt: 'Dr Amina Bello, Chief Scientific Officer',
    linkedin: 'https://linkedin.com/in/amina-bello'
  },
  {
    id: 't2',
    name: 'Collins Ayomie',
    role: 'Head of Product & Design',
    tagline: 'Packaging, UX & product strategy',
    bio: 'Industrial designer and product strategist focused on device UX and elegant consumer packaging.',
    img: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
    imgAlt: 'Collins Ayomie, Head of Product & Design',
    linkedin: 'https://linkedin.com/in/collins-ayomie'
  },
  {
    id: 't3',
    name: 'Lara Chen',
    role: 'Head of Clinical Affairs',
    tagline: 'Regulatory & clinical operations',
    bio: 'Manages clinical validation, regulatory submissions and quality systems for global markets.',
    img: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
    imgAlt: 'Lara Chen, Head of Clinical Affairs',
    linkedin: 'https://linkedin.com/in/lara-chen'
  },
  {
    id: 't4',
    name: 'Roberto Silva',
    role: 'Head of OEM & Manufacturing',
    tagline: 'Scalable private-label solutions',
    bio: 'Coordinates manufacturing, QC and packaging to deliver consistent OEM product lines.',
    img: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
    imgAlt: 'Roberto Silva, Head of OEM & Manufacturing',
    linkedin: 'https://linkedin.com/in/roberto-silva'
  },
  {
    id: 't5',
    name: 'Grace Nwosu',
    role: 'Marketing & Growth Lead',
    tagline: 'Growth for DTC & B2B channels',
    bio: 'Leads brand launches, performance marketing and retail growth strategies.',
    img: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
    imgAlt: 'Grace Nwosu, Marketing & Growth Lead',
    linkedin: 'https://linkedin.com/in/grace-nwosu'
  }
];

export default function OurTeamCarousel({ items = DEFAULT_TEAM, autoplay = true, autoplayInterval = 6000 }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const liveRef = useRef(null);
  const timerRef = useRef(null);

  // Touch/swipe handling
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const SWIPE_THRESHOLD = 50;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": items.map(p => ({
      "@type": "Person",
      name: p.name,
      jobTitle: p.role,
      description: p.tagline,
      image: p.img,
      sameAs: p.linkedin ? [p.linkedin] : undefined
    }))
  };

  useEffect(() => {
    // Announce current slide
    if (liveRef.current) {
      const cur = items[index];
      liveRef.current.textContent = `${cur.name}: ${cur.role}`;
    }
  }, [index, items]);

  useEffect(() => {
    // Autoplay management
    clearInterval(timerRef.current);
    if (playing) {
      timerRef.current = setInterval(() => {
        setIndex(i => (i + 1) % items.length);
      }, autoplayInterval);
    }
    return () => clearInterval(timerRef.current);
  }, [playing, autoplayInterval, items.length]);

  // Keyboard navigation
  function onKeyDown(e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    if (e.key === 'End') { e.preventDefault(); goTo(items.length - 1); }
    if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p); }
  }

  function next() { setIndex(i => (i + 1) % items.length); }
  function prev() { setIndex(i => (i - 1 + items.length) % items.length); }
  function goTo(i) { setIndex(Math.max(0, Math.min(i, items.length - 1))); }

  // Touch handlers
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPlaying(false);
  }
  function handleTouchMove(e) {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }
  function handleTouchEnd() {
    const dx = touchDeltaX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) next(); else prev();
    }
    touchDeltaX.current = 0;
    setPlaying(autoplay);
  }

  return (
    <section className="our-team-carousel-section" aria-labelledby="team-carousel-heading">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <div className="section-inner">
        <header className="team-carousel-header">
          <h2 id="team-carousel-heading">Meet the Team</h2>
          <p className="small-lead">Cross-functional experts powering science, product and growth.</p>
        </header>

        <div
          className="team-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Company team carousel"
        >
          <div
            className="carousel-viewport"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onFocus={() => setPlaying(false)}
            onBlur={() => setPlaying(autoplay)}
            onMouseEnter={() => setPlaying(false)}
            onMouseLeave={() => setPlaying(autoplay)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-describedby="team-carousel-instructions"
          >
            {items.map((p, i) => (
              <article
                key={p.id}
                className={`team-slide ${i === index ? 'active' : ''}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}`}
                aria-hidden={i === index ? 'false' : 'true'}
              >
                <div className="team-info-panel">
                  <h3 className="team-name">{p.name}</h3>
                  <div className="team-role">{p.role}</div>
                  <div className="team-tagline">{p.tagline}</div>
                  <p className="team-bio">{p.bio}</p>

                  <div className="team-ctas">
                    <a className="btn btn-primary" href={`/team/${p.id}`} aria-label={`View ${p.name} profile`}>
                      View profile
                    </a>
                    <a 
                      className="icon-link" 
                      href={p.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`${p.name} on LinkedIn`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6C1.1 6 0 4.88 0 3.5 0 2.12 1.12 1 2.5 1 3.88 1 4.98 2.12 4.98 3.5zM.5 8.98h3.9V24H.5V8.98zM10.02 8.98h3.75v2.06h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.68 2.6 4.68 5.98V24h-3.9v-7.26c0-1.73-.03-3.95-2.42-3.95-2.42 0-2.79 1.89-2.79 3.84V24h-3.9V8.98z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="team-image-wrap" aria-hidden={i === index ? 'false' : 'true'}>
                  <img
                    className="team-image"
                    src={p.img}
                    alt={p.imgAlt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    width="480"
                    height="480"
                  />
                </div>
              </article>
            ))}
          </div>

          {/* Screen reader instructions */}
          <div id="team-carousel-instructions" className="sr-only">
            Use arrow keys to navigate team members, space to pause autoplay, home and end to jump to first or last member.
          </div>

          {/* Live region for screen readers */}
          <div ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>
        </div>
      </div>
    </section>
  );
}