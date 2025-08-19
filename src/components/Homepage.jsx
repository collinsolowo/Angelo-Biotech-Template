import React, { useState, useEffect } from 'react';
import '../assets/styles/Homepage.css'

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomeTemplate />;
      case 'about': return <AboutTemplate />;
      case 'products': return <ProductsTemplate />;
      case 'services': return <ServicesTemplate />;
      case 'contact': return <ContactTemplate />;
      default: return <HomeTemplate />;
    }
  };

  return (
    <div className="website-templates">
      {/* Navigation for Template Preview */}
      <nav className="template-nav">
        <div className="nav-container">
          <div className="logo-placeholder">
            <div className="logo-box">YOUR COMPANY LOGO</div>
          </div>
          <div className="nav-links">
            <button 
              className={currentPage === 'home' ? 'active' : ''} 
              onClick={() => setCurrentPage('home')}
            >
              HOME
            </button>
            <button 
              className={currentPage === 'about' ? 'active' : ''} 
              onClick={() => setCurrentPage('about')}
            >
              ABOUT
            </button>
            <button 
              className={currentPage === 'products' ? 'active' : ''} 
              onClick={() => setCurrentPage('products')}
            >
              PRODUCTS
            </button>
            <button 
              className={currentPage === 'services' ? 'active' : ''} 
              onClick={() => setCurrentPage('services')}
            >
              SERVICES
            </button>
            <button 
              className={currentPage === 'contact' ? 'active' : ''} 
              onClick={() => setCurrentPage('contact')}
            >
              CONTACT
            </button>
          </div>
        </div>
      </nav>

      {/* Render Current Page */}
      {renderPage()}

      {/* Template Footer */}
      <footer className="template-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>COMPANY INFORMATION NEEDED:</h4>
            <ul>
              <li>• Company Name & Logo</li>
              <li>• Business Address</li>
              <li>• Phone Number</li>
              <li>• Email Address</li>
              <li>• Social Media Links</li>
              <li>• Copyright Year</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

// HOME PAGE TEMPLATE
const HomeTemplate = () => (
  <div className="page-template home-template">
    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-content">
        <div className="info-needed">
          <span className="label">NEEDED: MAIN HEADLINE</span>
        </div>
        <h1 className="hero-title">YOUR MAIN COMPANY HEADLINE HERE</h1>
        
        <div className="info-needed">
          <span className="label">NEEDED: COMPANY DESCRIPTION</span>
        </div>
        <p className="hero-description">
          Your company description and value proposition goes here. 
          What makes your company unique? What do you offer?
        </p>
        
        <div className="hero-buttons">
          <button className="cta-primary">
            <div className="info-needed">
              <span className="label">NEEDED: PRIMARY CTA TEXT</span>
            </div>
            PRIMARY BUTTON TEXT
          </button>
          <button className="cta-secondary">
            <div className="info-needed">
              <span className="label">NEEDED: SECONDARY CTA TEXT</span>
            </div>
            SECONDARY BUTTON TEXT
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="info-needed">
              <span className="label">NEEDED: STATISTIC 1</span>
            </div>
            <div className="stat-number">XXX+</div>
            <div className="stat-label">METRIC NAME</div>
          </div>
          <div className="stat-item">
            <div className="info-needed">
              <span className="label">NEEDED: STATISTIC 2</span>
            </div>
            <div className="stat-number">XXX+</div>
            <div className="stat-label">METRIC NAME</div>
          </div>
          <div className="stat-item">
            <div className="info-needed">
              <span className="label">NEEDED: STATISTIC 3</span>
            </div>
            <div className="stat-number">XX%</div>
            <div className="stat-label">METRIC NAME</div>
          </div>
        </div>
      </div>
    </section>

    {/* Services/Products Preview */}
    <section className="services-preview">
      <div className="section-header">
        <div className="info-needed">
          <span className="label">NEEDED: SERVICES SECTION TITLE</span>
        </div>
        <h2>OUR MAIN SERVICES/PRODUCTS</h2>
      </div>
      
      <div className="services-grid">
        {[1, 2, 3, 4].map(num => (
          <div key={num} className="service-card">
            <div className="service-icon">
              <div className="info-needed">
                <span className="label">NEEDED: SERVICE {num} ICON/IMAGE</span>
              </div>
              <div className="icon-placeholder">ICON</div>
            </div>
            <div className="info-needed">
              <span className="label">NEEDED: SERVICE {num} TITLE</span>
            </div>
            <h3>SERVICE {num} TITLE</h3>
            <div className="info-needed">
              <span className="label">NEEDED: SERVICE {num} DESCRIPTION</span>
            </div>
            <p>Description of service {num} and its benefits to customers.</p>
          </div>
        ))}
      </div>
    </section>

    {/* Company Stats/Global Presence */}
    <section className="global-stats">
      <div className="info-needed">
        <span className="label">NEEDED: GLOBAL PRESENCE TITLE</span>
      </div>
      <h2>OUR GLOBAL REACH</h2>
      
      <div className="stats-grid">
        {['Region 1', 'Region 2', 'Region 3', 'Region 4'].map((region, index) => (
          <div key={index} className="global-stat">
            <div className="info-needed">
              <span className="label">NEEDED: {region.toUpperCase()} CUSTOMER COUNT</span>
            </div>
            <div className="stat-number">XXX,XXX</div>
            <div className="stat-label">{region}</div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ABOUT PAGE TEMPLATE
const AboutTemplate = () => (
  <div className="page-template about-template">
    <section className="about-hero">
      <div className="info-needed">
        <span className="label">NEEDED: ABOUT PAGE HEADLINE</span>
      </div>
      <h1>ABOUT OUR COMPANY</h1>
      
      <div className="info-needed">
        <span className="label">NEEDED: COMPANY STORY/MISSION</span>
      </div>
      <p className="about-intro">
        Your company's story, mission, and vision goes here. 
        What drives your company? What are your core values?
      </p>
    </section>

    <section className="company-info">
      <div className="info-grid">
        <div className="info-card">
          <div className="info-needed">
            <span className="label">NEEDED: COMPANY HISTORY</span>
          </div>
          <h3>OUR HISTORY</h3>
          <p>When was the company founded? Key milestones and achievements.</p>
        </div>
        
        <div className="info-card">
          <div className="info-needed">
            <span className="label">NEEDED: COMPANY MISSION</span>
          </div>
          <h3>OUR MISSION</h3>
          <p>What is your company's mission statement and core purpose?</p>
        </div>
        
        <div className="info-card">
          <div className="info-needed">
            <span className="label">NEEDED: COMPANY VALUES</span>
          </div>
          <h3>OUR VALUES</h3>
          <p>What are your company's core values and principles?</p>
        </div>
        
        <div className="info-card">
          <div className="info-needed">
            <span className="label">NEEDED: COMPANY VISION</span>
          </div>
          <h3>OUR VISION</h3>
          <p>What is your company's vision for the future?</p>
        </div>
      </div>
    </section>

    <section className="team-section">
      <div className="info-needed">
        <span className="label">NEEDED: TEAM SECTION TITLE</span>
      </div>
      <h2>MEET OUR TEAM</h2>
      
      <div className="team-grid">
        {[1, 2, 3, 4].map(num => (
          <div key={num} className="team-member">
            <div className="member-photo">
              <div className="info-needed">
                <span className="label">NEEDED: TEAM MEMBER {num} PHOTO</span>
              </div>
              <div className="photo-placeholder">PHOTO</div>
            </div>
            <div className="info-needed">
              <span className="label">NEEDED: TEAM MEMBER {num} NAME</span>
            </div>
            <h4>TEAM MEMBER {num} NAME</h4>
            <div className="info-needed">
              <span className="label">NEEDED: TEAM MEMBER {num} POSITION</span>
            </div>
            <p className="position">Position/Title</p>
            <div className="info-needed">
              <span className="label">NEEDED: TEAM MEMBER {num} BIO</span>
            </div>
            <p className="bio">Brief bio and expertise of team member {num}.</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// PRODUCTS PAGE TEMPLATE
const ProductsTemplate = () => (
  <div className="page-template products-template">
    <section className="products-hero">
      <div className="info-needed">
        <span className="label">NEEDED: PRODUCTS PAGE HEADLINE</span>
      </div>
      <h1>OUR PRODUCTS</h1>
      
      <div className="info-needed">
        <span className="label">NEEDED: PRODUCTS DESCRIPTION</span>
      </div>
      <p>Overview of your product line and what makes them special.</p>
    </section>

    <section className="products-showcase">
      <div className="products-grid">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <div key={num} className="product-card">
            <div className="product-image">
              <div className="info-needed">
                <span className="label">NEEDED: PRODUCT {num} IMAGE</span>
              </div>
              <div className="image-placeholder">PRODUCT IMAGE</div>
            </div>
            
            <div className="product-info">
              <div className="info-needed">
                <span className="label">NEEDED: PRODUCT {num} NAME</span>
              </div>
              <h3>PRODUCT {num} NAME</h3>
              
              <div className="info-needed">
                <span className="label">NEEDED: PRODUCT {num} DESCRIPTION</span>
              </div>
              <p>Product {num} description, benefits, and key features.</p>
              
              <div className="product-features">
                <div className="info-needed">
                  <span className="label">NEEDED: PRODUCT {num} KEY FEATURES</span>
                </div>
                <ul>
                  <li>Key feature 1</li>
                  <li>Key feature 2</li>
                  <li>Key feature 3</li>
                </ul>
              </div>
              
              <div className="product-price">
                <div className="info-needed">
                  <span className="label">NEEDED: PRODUCT {num} PRICE (Optional)</span>
                </div>
                <span className="price">$XXX</span>
              </div>
              
              <button className="product-cta">
                <div className="info-needed">
                  <span className="label">NEEDED: PRODUCT CTA TEXT</span>
                </div>
                LEARN MORE / BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="product-categories">
      <div className="info-needed">
        <span className="label">NEEDED: PRODUCT CATEGORIES</span>
      </div>
      <h2>PRODUCT CATEGORIES</h2>
      
      <div className="categories-grid">
        {['Category 1', 'Category 2', 'Category 3'].map((category, index) => (
          <div key={index} className="category-card">
            <div className="info-needed">
              <span className="label">NEEDED: {category.toUpperCase()} ICON</span>
            </div>
            <div className="category-icon">ICON</div>
            <h4>{category}</h4>
            <div className="info-needed">
              <span className="label">NEEDED: {category.toUpperCase()} DESCRIPTION</span>
            </div>
            <p>Description of {category.toLowerCase()} and included products.</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// SERVICES PAGE TEMPLATE
const ServicesTemplate = () => (
  <div className="page-template services-template">
    <section className="services-hero">
      <div className="info-needed">
        <span className="label">NEEDED: SERVICES PAGE HEADLINE</span>
      </div>
      <h1>OUR SERVICES</h1>
      
      <div className="info-needed">
        <span className="label">NEEDED: SERVICES OVERVIEW</span>
      </div>
      <p>Overview of your services and how they benefit your clients.</p>
    </section>

    <section className="services-detailed">
      {[1, 2, 3, 4].map(num => (
        <div key={num} className="service-detail">
          <div className="service-content">
            <div className="info-needed">
              <span className="label">NEEDED: SERVICE {num} TITLE</span>
            </div>
            <h3>SERVICE {num} TITLE</h3>
            
            <div className="info-needed">
              <span className="label">NEEDED: SERVICE {num} DETAILED DESCRIPTION</span>
            </div>
            <p>Detailed description of service {num}, including process, benefits, and outcomes.</p>
            
            <div className="service-benefits">
              <div className="info-needed">
                <span className="label">NEEDED: SERVICE {num} BENEFITS LIST</span>
              </div>
              <h4>Benefits:</h4>
              <ul>
                <li>Benefit 1</li>
                <li>Benefit 2</li>
                <li>Benefit 3</li>
              </ul>
            </div>
          </div>
          
          <div className="service-visual">
            <div className="info-needed">
              <span className="label">NEEDED: SERVICE {num} IMAGE/DIAGRAM</span>
            </div>
            <div className="visual-placeholder">SERVICE IMAGE</div>
          </div>
        </div>
      ))}
    </section>

    <section className="service-process">
      <div className="info-needed">
        <span className="label">NEEDED: SERVICE PROCESS TITLE</span>
      </div>
      <h2>OUR PROCESS</h2>
      
      <div className="process-steps">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <div key={num} className="process-step">
            <div className="step-number">{num}</div>
            <div className="info-needed">
              <span className="label">NEEDED: PROCESS STEP {num} TITLE</span>
            </div>
            <h4>STEP {num} TITLE</h4>
            <div className="info-needed">
              <span className="label">NEEDED: PROCESS STEP {num} DESCRIPTION</span>
            </div>
            <p>Description of what happens in step {num}.</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// CONTACT PAGE TEMPLATE
const ContactTemplate = () => (
  <div className="page-template contact-template">
    <section className="contact-hero">
      <div className="info-needed">
        <span className="label">NEEDED: CONTACT PAGE HEADLINE</span>
      </div>
      <h1>CONTACT US</h1>
      
      <div className="info-needed">
        <span className="label">NEEDED: CONTACT PAGE DESCRIPTION</span>
      </div>
      <p>Get in touch with us. We'd love to hear from you.</p>
    </section>

    <section className="contact-content">
      <div className="contact-info">
        <div className="contact-card">
          <div className="info-needed">
            <span className="label">NEEDED: BUSINESS ADDRESS</span>
          </div>
          <h3>📍 ADDRESS</h3>
          <p>
            Your Business Address<br/>
            City, State ZIP Code<br/>
            Country
          </p>
        </div>
        
        <div className="contact-card">
          <div className="info-needed">
            <span className="label">NEEDED: PHONE NUMBER</span>
          </div>
          <h3>📞 PHONE</h3>
          <p>+1 (XXX) XXX-XXXX</p>
        </div>
        
        <div className="contact-card">
          <div className="info-needed">
            <span className="label">NEEDED: EMAIL ADDRESS</span>
          </div>
          <h3>✉️ EMAIL</h3>
          <p>info@yourcompany.com</p>
        </div>
        
        <div className="contact-card">
          <div className="info-needed">
            <span className="label">NEEDED: BUSINESS HOURS</span>
          </div>
          <h3>🕒 HOURS</h3>
          <p>
            Monday - Friday: 9:00 AM - 6:00 PM<br/>
            Saturday: 10:00 AM - 4:00 PM<br/>
            Sunday: Closed
          </p>
        </div>
      </div>

      <div className="contact-form">
        <div className="info-needed">
          <span className="label">NEEDED: CONTACT FORM PREFERENCES</span>
        </div>
        <h3>SEND US A MESSAGE</h3>
        
        <form className="form-template">
          <div className="form-group">
            <label>Name *</label>
            <input type="text" placeholder="Your Name" />
          </div>
          
          <div className="form-group">
            <label>Email *</label>
            <input type="email" placeholder="your@email.com" />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="Your Phone Number" />
          </div>
          
          <div className="form-group">
            <label>Subject *</label>
            <input type="text" placeholder="Message Subject" />
          </div>
          
          <div className="form-group">
            <label>Message *</label>
            <textarea placeholder="Your message here..." rows="5"></textarea>
          </div>
          
          <button type="submit" className="submit-btn">
            <div className="info-needed">
              <span className="label">NEEDED: SUBMIT BUTTON TEXT</span>
            </div>
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>

    <section className="map-section">
      <div className="info-needed">
        <span className="label">NEEDED: GOOGLE MAPS EMBED OR LOCATION MAP</span>
      </div>
      <div className="map-placeholder">
        <h3>LOCATION MAP</h3>
        <p>Google Maps embed will go here showing your business location</p>
      </div>
    </section>
  </div>
);

export default HomePage;