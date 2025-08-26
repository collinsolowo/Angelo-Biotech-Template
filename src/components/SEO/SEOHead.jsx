import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = "Angelo HZS - Advanced Biotechnology for Human Vitality",
  description = "World-leading SOD·NAMPT extraction technology for anti-aging and cellular regeneration. 30+ global branches, 150+ patents, 25 years of biotechnology excellence.",
  keywords = "biotechnology, anti-aging, SOD extraction, NAMPT protein, cellular regeneration, hydrogen water, Angelo HZS",
  image = "/og-image.jpg",
  url = "https://angelohzs.com",
  type = "website",
  structuredData = null
}) => {
  const siteTitle = "Angelo HZS";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Angelo HZS Biotechnology Corporation" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@angelohzs" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0f4bd8" />
      <meta name="msapplication-TileColor" content="#0f4bd8" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Angelo HZS Biotechnology Corporation",
          "alternateName": "Angelo HZS",
          "url": "https://angelohzs.com",
          "logo": "https://angelohzs.com/LOGO.png",
          "description": "World-leading biotechnology company specializing in SOD·NAMPT extraction technology for anti-aging and cellular regeneration.",
          "foundingDate": "1999",
          "founder": {
            "@type": "Person",
            "name": "Dr. Jiaqi Liu",
            "jobTitle": "Chairman & Founder",
            "alumniOf": "Stanford University"
          },
          "address": [
            {
              "@type": "PostalAddress",
              "addressLocality": "Los Angeles",
              "addressRegion": "CA",
              "addressCountry": "US",
              "name": "Angelo HZS USA Headquarters"
            },
            {
              "@type": "PostalAddress",
              "addressLocality": "Qingdao",
              "addressRegion": "Shandong",
              "addressCountry": "CN",
              "name": "Angelo HZS Greater China Headquarters"
            }
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "info@angelohzs.com"
          },
          "sameAs": [
            "https://linkedin.com/company/angelohzs",
            "https://twitter.com/angelohzs"
          ],
          "numberOfEmployees": "500+",
          "industry": "Biotechnology",
          "keywords": "biotechnology, anti-aging, SOD extraction, NAMPT protein, cellular regeneration"
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;