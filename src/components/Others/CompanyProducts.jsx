// CompanyProducts.jsx - Updated with accessibility improvements
import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Homepage.css';

export default function CompanyProducts({
  items = DEFAULT_PRODUCTS,
  autoplay = true,
  autoplayInterval = 6000,
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const slidesRef = useRef(null);
  const liveRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Announce initial slide for screen readers
    if (liveRef.current) {
      liveRef.current.textContent = `${items[index].title} — ${items[index].subtitle}`;
    }
  }, []);

  useEffect(() => {
    // Autoplay behavior
    clearInterval(timerRef.current);
    if (playing) {
      timerRef.current = setInterval(() => {
        setIndex(i => (i + 1) % items.length);
      }, autoplayInterval);
    }
    return () => clearInterval(timerRef.current);
  }, [playing, autoplayInterval, items.length]);

  useEffect(() => {
    // Update live region when index changes
    if (liveRef.current) {
      liveRef.current.textContent = `${items[index].title} — ${items[index].subtitle}`;
    }
  }, [index, items]);

  // Keyboard navigation
  function onKeyDown(e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault(); next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault(); prev();
    } else if (e.key === 'Home') {
      e.preventDefault(); goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault(); goTo(items.length - 1);
    } else if (e.key === ' ') {
      e.preventDefault();
      setPlaying(p => !p);
    }
  }

  function next() { setIndex(i => (i + 1) % items.length); }
  function prev() { setIndex(i => (i - 1 + items.length) % items.length); }
  function goTo(i) { setIndex(Math.max(0, Math.min(i, items.length - 1))); }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": items.map(prod => ({
      "@type": "Product",
      "name": prod.title,
      "description": prod.description,
      "image": prod.image ? `${window.location.origin}${prod.image}` : undefined,
      "url": `${window.location.origin}/products/${prod.slug || ''}`,
      "brand": {
        "@type": "Organization",
        "name": "Angelo Biotech Africa"
      }
    }))
  };

  return (
    <section className="company-products-section" aria-labelledby="products-heading">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <div className="section-inner">
        <header className="section-header">
          <h2 id="products-heading">Our Products & Solutions</h2>
          <p className="lead">
            Innovative health and regeneration products backed by science — H2O Hydrogen Cups, antioxidant supplements,
            anti-aging solutions, and OEM services for partners.
          </p>
        </header>

        <div
          className="products-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured products"
        >
          <div
            className="carousel-viewport"
            ref={slidesRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onFocus={() => setPlaying(false)}
            onBlur={() => setPlaying(autoplay)}
            onMouseEnter={() => setPlaying(false)}
            onMouseLeave={() => setPlaying(autoplay)}
            aria-describedby="carousel-instructions"
          >
            {items.map((item, i) => (
              <article
                key={item.id || i}
                className={`carousel-slide ${i === index ? 'active' : ''}`}
                aria-hidden={i === index ? 'false' : 'true'}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}`}
              >
                <figure className="product-figure">
                  <img 
                    src={item.image} 
                    alt={item.imageAlt || item.title} 
                    className="product-image"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </figure>

                <div className="product-copy">
                  <h3 className="product-title">{item.title}</h3>
                  <p className="product-sub">{item.subtitle}</p>
                  <p className="product-description">{item.description}</p>
                  <a 
                    href={`/products/${item.slug || ''}`} 
                    className="btn btn-primary" 
                    aria-label={`Learn more about ${item.title}`}
                  >
                    Learn more
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Screen reader instructions */}
          <div id="carousel-instructions" className="sr-only">
            Use arrow keys to navigate slides, space to pause autoplay, home and end to jump to first or last slide.
          </div>

          {/* Live region for announcements */}
          <div ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>
        </div>
      </div>
    </section>
  );
}

/* Default product data */
const DEFAULT_PRODUCTS = [
  {
    id: 'hydro-cup',
    title: 'H2O Hydrogen Water Cup',
    subtitle: 'Hydrogen-enriched drinking cup for everyday wellness',
    description: 'Portable hydrogen water cup engineered to safely infuse water with molecular hydrogen — antioxidant support and improved hydration. Lightweight, USB-C recharge, medical-grade materials.',
    image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Modern water cup with hydrogen technology',
    slug: 'h2o-hydrogen-water-cup',
  },
  {
    id: 'sod-supplements',
    title: 'SOD Supplements',
    subtitle: 'Superoxide Dismutase antioxidant formula',
    description: 'Scientifically-formulated SOD supplement blends to help neutralize oxidative stress at the cellular level. Vegan capsules, clinically-aware dosing guidance.',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Bottle of SOD supplements with capsules',
    slug: 'sod-supplements',
  },
  {
    id: 'nampt',
    title: 'NAMPT Products',
    subtitle: 'NAD+ boosting NAMPT category',
    description: 'Nicotinamide phosphoribosyltransferase (NAMPT) range for supporting cellular metabolism and energy pathways. Designed for research-grade and consumer-friendly formulations.',
    image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Laboratory equipment representing NAMPT research',
    slug: 'nampt-products',
  },
  {
    id: 'anti-aging',
    title: 'Anti-Aging Solutions',
    subtitle: 'Targeted skincare and supplement solutions',
    description: 'Multi-modal anti-aging line focusing on collagen support, antioxidant protection, and cellular repair. Topicals and oral options with transparent ingredient sourcing.',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Anti-aging serum and skincare products',
    slug: 'anti-aging-solutions',
  },
  {
    id: 'cellular',
    title: 'Cellular Regeneration',
    subtitle: 'Regenerative therapies and supportive products',
    description: 'Product suite focusing on cellular regeneration: peptides, targeted nutraceuticals and adjunctive devices designed to support tissue repair and longevity goals.',
    image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Microscopic view of cellular regeneration',
    slug: 'cellular-regeneration',
  },
  {
    id: 'oem',
    title: 'OEM Services',
    subtitle: 'Private label & OEM manufacturing',
    description: 'Full OEM licensing, formulation, packaging and regulatory support for brands seeking white-label or bespoke manufacturing solutions.',
    image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Manufacturing and packaging facility',
    slug: 'oem-services',
  }
];