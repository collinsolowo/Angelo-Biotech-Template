import React, { useState } from 'react';
import '../styles/ContactPage.css';
import Navbar from './Navbar';
import Footer from './Footer/Footer';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear errors when user starts typing
        if (formStatus.type === 'error') {
            setFormStatus({ type: '', message: '' });
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) return 'Name is required';
        if (!formData.email.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email';
        if (!formData.subject.trim()) return 'Subject is required';
        if (!formData.message.trim()) return 'Message is required';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            setFormStatus({ type: 'error', message: error });
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call - replace with actual endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));

            setFormStatus({
                type: 'success',
                message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
            });
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                inquiryType: 'general'
            });
        } catch (error) {
            setFormStatus({
                type: 'error',
                message: 'Sorry, there was an error sending your message. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            <Navbar />
            <main id="main-content" className="contact-page">
                {/* Hero Section */}
                <section className="contact-hero" aria-labelledby="contact-hero-title">
                    <div className="container">
                        <h1 id="contact-hero-title" className="contact-hero__title">
                            Get in Touch
                        </h1>
                        <p className="contact-hero__subtitle">
                            Ready to transform your health journey? Let's connect and explore how Angelo Biotech Africa can help you.
                        </p>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="contact-methods" aria-labelledby="contact-methods-title">
                    <div className="container">
                        <h2 id="contact-methods-title" className="section-title">Contact Information</h2>
                        <div className="contact-methods__grid">
                            <div className="contact-methods__card">
                                <div className="contact-methods__icon" aria-hidden="true">📧</div>
                                <h3 className="contact-methods__title">Email Us</h3>
                                <div className="contact-methods__content">
                                    <a href="mailto:info@angelobiotech.com" className="contact-methods__link">
                                        info@angelobiotech.com
                                    </a>
                                    <p className="contact-methods__note">General inquiries and support</p>
                                </div>
                            </div>

                            <div className="contact-methods__card">
                                <div className="contact-methods__icon" aria-hidden="true">📞</div>
                                <h3 className="contact-methods__title">Call Us</h3>
                                <div className="contact-methods__content">
                                    <a href="tel:+2348001234567" className="contact-methods__link">
                                        +234 800 123 4567
                                    </a>
                                    <p className="contact-methods__note">Mon-Fri, 9AM-6PM WAT</p>
                                </div>
                            </div>

                            <div className="contact-methods__card">
                                <div className="contact-methods__icon" aria-hidden="true">📍</div>
                                <h3 className="contact-methods__title">Visit Us</h3>
                                <div className="contact-methods__content">
                                    <address className="contact-methods__address">
                                        123 Innovation Drive<br />
                                        Victoria Island, Lagos<br />
                                        Nigeria
                                    </address>
                                </div>
                            </div>

                            <div className="contact-methods__card">
                                <div className="contact-methods__icon" aria-hidden="true">💬</div>
                                <h3 className="contact-methods__title">Live Chat</h3>
                                <div className="contact-methods__content">
                                    <button className="contact-methods__chat-btn" type="button">
                                        Start Live Chat
                                    </button>
                                    <p className="contact-methods__note">Available 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="contact-form-section" aria-labelledby="contact-form-title">
                    <div className="container">
                        <h2 id="contact-form-title" className="section-title">Send Us a Message</h2>

                        <form className="contact-form" onSubmit={handleSubmit} noValidate>
                            <div className="contact-form__grid">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">
                                        Full Name <span className="required" aria-label="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        aria-describedby="name-error"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">
                                        Email Address <span className="required" aria-label="required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        aria-describedby="email-error"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inquiryType" className="form-label">
                                    Inquiry Type
                                </label>
                                <select
                                    id="inquiryType"
                                    name="inquiryType"
                                    className="form-select"
                                    value={formData.inquiryType}
                                    onChange={handleInputChange}
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="products">Product Information</option>
                                    <option value="distributor">Become a Distributor</option>
                                    <option value="investor">Investment Opportunities</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="support">Customer Support</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">
                                    Subject <span className="required" aria-label="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    Message <span className="required" aria-label="required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Tell us how we can help you..."
                                ></textarea>
                            </div>

                            {formStatus.message && (
                                <div
                                    className={`form-status ${formStatus.type}`}
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {formStatus.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="form-submit"
                                disabled={isSubmitting}
                                aria-describedby="submit-help"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            <p id="submit-help" className="form-help">
                                We typically respond within 24 hours during business days.
                            </p>
                        </form>
                    </div>
                </section>

                {/* Office Locations */}
                <section className="contact-locations" aria-labelledby="locations-title">
                    <div className="container">
                        <h2 id="locations-title" className="section-title">Our Global Presence</h2>
                        <div className="contact-locations__grid">
                            <div className="contact-locations__region">
                                <h3 className="contact-locations__region-title">Africa Headquarters</h3>
                                <div className="contact-locations__offices">
                                    <div className="contact-locations__office">
                                        <h4>Lagos, Nigeria</h4>
                                        <address>
                                            123 Innovation Drive<br />
                                            Victoria Island, Lagos<br />
                                            +234 800 123 4567
                                        </address>
                                    </div>
                                    <div className="contact-locations__office">
                                        <h4>Accra, Ghana</h4>
                                        <address>
                                            45 Independence Avenue<br />
                                            Accra, Ghana<br />
                                            +233 30 123 4567
                                        </address>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-locations__region">
                                <h3 className="contact-locations__region-title">International Offices</h3>
                                <div className="contact-locations__offices">
                                    <div className="contact-locations__office">
                                        <h4>London, UK</h4>
                                        <address>
                                            78 Canary Wharf<br />
                                            London E14 5HQ<br />
                                            +44 20 7123 4567
                                        </address>
                                    </div>
                                    <div className="contact-locations__office">
                                        <h4>Singapore</h4>
                                        <address>
                                            Marina Bay Financial Centre<br />
                                            Singapore 018989<br />
                                            +65 6123 4567
                                        </address>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="contact-faq" aria-labelledby="faq-title">
                    <div className="container">
                        <h2 id="faq-title" className="section-title">Frequently Asked Questions</h2>
                        <div className="contact-faq__list">
                            <details className="contact-faq__item">
                                <summary className="contact-faq__question">
                                    How can I become a distributor?
                                </summary>
                                <div className="contact-faq__answer">
                                    <p>
                                        To become a distributor, please fill out our contact form selecting "Become a Distributor"
                                        as your inquiry type. Our partnership team will reach out within 48 hours to discuss
                                        opportunities in your region.
                                    </p>
                                </div>
                            </details>

                            <details className="contact-faq__item">
                                <summary className="contact-faq__question">
                                    What are your product shipping options?
                                </summary>
                                <div className="contact-faq__answer">
                                    <p>
                                        We offer various shipping options depending on your location. Standard delivery
                                        takes 5-7 business days within Africa, and 7-14 days internationally. Express
                                        shipping is available for urgent orders.
                                    </p>
                                </div>
                            </details>

                            <details className="contact-faq__item">
                                <summary className="contact-faq__question">
                                    Do you offer investment opportunities?
                                </summary>
                                <div className="contact-faq__answer">
                                    <p>
                                        Yes, we welcome strategic investors who share our vision. Please contact us
                                        through the form above selecting "Investment Opportunities" to receive our
                                        investor information package.
                                    </p>
                                </div>
                            </details>

                            <details className="contact-faq__item">
                                <summary className="contact-faq__question">
                                    What is your return policy?
                                </summary>
                                <div className="contact-faq__answer">
                                    <p>
                                        We offer a 30-day satisfaction guarantee on all products. If you're not completely
                                        satisfied, contact our customer service team for a full refund or exchange.
                                    </p>
                                </div>
                            </details>
                        </div>
                    </div>
                </section>

                {/* Newsletter Signup */}
                <section className="contact-newsletter" aria-labelledby="newsletter-title">
                    <div className="container">
                        <div className="contact-newsletter__content">
                            <h2 id="newsletter-title" className="contact-newsletter__title">
                                Stay Updated
                            </h2>
                            <p className="contact-newsletter__description">
                                Get the latest updates on our products, research breakthroughs, and health tips
                                delivered directly to your inbox.
                            </p>

                            <form className="contact-newsletter__form" onSubmit={(e) => e.preventDefault()}>
                                <div className="contact-newsletter__input-group">
                                    <label htmlFor="newsletter-email" className="sr-only">
                                        Email address for newsletter
                                    </label>
                                    <input
                                        type="email"
                                        id="newsletter-email"
                                        className="contact-newsletter__input"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                    <button type="submit" className="contact-newsletter__button">
                                        Subscribe
                                    </button>
                                </div>
                                <p className="contact-newsletter__privacy">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ContactPage;
