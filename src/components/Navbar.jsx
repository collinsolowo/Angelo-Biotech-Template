import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, ArrowRight } from "lucide-react";
import NavLogo from '../../public/LOGO.png'
import "../styles/Navbar.css";

// Navigation items configuration
const navItems = [
  { name: 'Home', to: '/', key: 'home' },
  { name: 'About', to: '/about', key: 'about' },
  { name: 'Products', to: '/products', key: 'products' },
  { name: 'Contact', to: '/contact', key: 'contact' },
];

// Mock translations for demo
const TRANSLATIONS = {
  en: { 
    code: 'en',
    home: 'Home',
    about: 'About',
    products: 'Products',
    services: 'Leadership',
    contact: 'Contact'
  },
  fr: { 
    code: 'fr',
    home: 'Accueil',
    about: 'À propos',
    products: 'Produits',
    services: 'Direction',
    contact: 'Contact'
  },
  zh: { 
    code: 'zh-CN',
    home: '首页',
    about: '关于我们',
    products: '产品',
    services: '领导团队',
    contact: '联系我们'
  }
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("en");
  
  const menuRef = useRef(null);
  const langMenuRef = useRef(null);
  const navRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setLangOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const selectLanguage = (code) => {
    setLang(code);
    setLangOpen(false);
    localStorage.setItem('siteLang', code);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const t = TRANSLATIONS[lang];

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav 
        ref={navRef}
        className={`hunch-navbar ${isScrolled ? 'scrolled' : ''}`} 
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="hunch-nav-container">
          {/* Logo Section */}
          <div className="hunch-logo-section">
            <Link to="/" className="hunch-logo-link" aria-label="Angelo Biotech Africa - Home">
              <div className="hunch-logo-wrapper">
                <img 
                  src={NavLogo} 
                  alt="Angelo Biotech Africa" 
                  className="hunch-nav-logo" 
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hunch-desktop-nav">
            <ul className="hunch-nav-links" role="menubar">
              {navItems.map((item, index) => (
                <li key={item.to} role="none">
                  <NavLink
                    to={item.to}
                    role="menuitem"
                    className={({ isActive }) => 
                      `hunch-nav-link ${isActive ? 'active' : ''}`
                    }
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <span className="hunch-link-text">{t[item.key]}</span>
                    <div className="hunch-link-indicator"></div>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="hunch-cta-section">

              <Link to="/contact" className="hunch-btn hunch-btn-primary">
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`hunch-mobile-menu-btn ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span className="hunch-menu-icon">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`hunch-mobile-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>

        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className={`hunch-mobile-menu ${isOpen ? 'open' : ''}`}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="hunch-mobile-menu-inner">
            <div className="hunch-mobile-menu-header">
              <h2 id="mobile-menu-title" className="hunch-menu-title">Navigation</h2>
              <div className="hunch-menu-divider"></div>
            </div>

            <ul className="hunch-mobile-nav-links">
              {navItems.map((item, index) => (
                <li key={item.to} style={{ '--index': index }}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => 
                      `hunch-mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="hunch-mobile-link-text">{t[item.key]}</span>
                    <ArrowRight size={16} className="hunch-mobile-link-arrow" />
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hunch-mobile-cta-section">
              <Link to="/track" className="hunch-btn hunch-btn-secondary hunch-btn-full" onClick={() => setIsOpen(false)}>
                Track Order
              </Link>
              <Link to="/contact" className="hunch-btn hunch-btn-primary hunch-btn-full" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </div>

            <div className="hunch-mobile-lang-section">
              <h3 className="hunch-mobile-lang-title">Language</h3>
              <div className="hunch-mobile-lang-grid">
                {Object.entries(TRANSLATIONS).map(([code, translation]) => (
                  <button
                    key={code}
                    className={`hunch-mobile-lang-btn ${lang === code ? 'active' : ''}`}
                    onClick={() => selectLanguage(code)}
                  >
                    <span>{code === 'en' ? 'EN' : code === 'fr' ? 'FR' : 'CN'}</span>
                    {lang === code && <div className="hunch-mobile-lang-indicator"></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;