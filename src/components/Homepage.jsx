import React, { useState, useEffect } from 'react';
import SEOHead from './SEO/SEOHead';
import Hero from './Hero/Hero';
import Footer from './Footer/Footer';
import '../styles/variables.css';
import '../styles/base.css';
import Navbar from './Navbar';
import CompanyProducts from './Others/CompanyProducts';
import OurTeam from './Others/OurTeam';
import CompanyGlobalMap from './Others/CompanyGlobalMap';
import SocialMediaSection from './Others/SocialMediaSection';

const HomePage = () => {
  return (
    <>
      <SEOHead />
      <Navbar />
      <main id="main-content">
        <Hero />
        <CompanyProducts/>
        <OurTeam/>
        <CompanyGlobalMap/>
        <SocialMediaSection/>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;