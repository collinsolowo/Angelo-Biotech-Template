import React, { useState } from 'react';
import { Wifi, Smartphone, Activity, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const HomeTechGrid = ({ products = [] }) => {
  const [expandedSpec, setExpandedSpec] = useState(null);

  const techFeatures = [
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description: 'Continuous data collection with instant insights'
    },
    {
      icon: Smartphone, 
      title: 'Smart Integration',
      description: 'Seamlessly connects with your existing devices'
    },
    {
      icon: Wifi,
      title: 'Connected Ecosystem',
      description: 'Cloud-based analytics and remote monitoring'
    }
  ];

  const getDeviceSpecs = (product) => {
    // Generate relevant specs based on product type
    const baseSpecs = {
      'Air Quality Monitor Pro': [
        { label: 'Sensors', value: 'PM2.5, PM10, VOC, Temperature, Humidity' },
        { label: 'Accuracy', value: '±10% for PM2.5, ±15% for VOC' },
        { label: 'Range', value: '0-500 μg/m³ (PM2.5)' },
        { label: 'Connectivity', value: 'WiFi 802.11b/g/n, Bluetooth 5.0' },
        { label: 'Power', value: 'AC adapter included, 5W consumption' },
        { label: 'Dimensions', value: '120 x 120 x 40mm' },
        { label: 'App Support', value: 'iOS 12+, Android 8+' }
      ],
      'Sleep Tracking Mat': [
        { label: 'Detection Type', value: 'Pressure-based, non-contact' },
        { label: 'Sensitivity', value: 'Movement detection to 1mm' },
        { label: 'Coverage Area', value: 'Full bed width, up to King size' },
        { label: 'Sleep Metrics', value: 'Duration, stages, heart rate, breathing' },
        { label: 'Battery Life', value: '6 months (replaceable)' },
        { label: 'Connectivity', value: 'WiFi, Bluetooth Low Energy' },
        { label: 'Compatibility', value: 'Works with any mattress type' }
      ],
      'Smart Water Filter': [
        { label: 'Filtration', value: '5-stage carbon block system' },
        { label: 'Contaminants', value: '99%+ removal of chlorine, lead, mercury' },
        { label: 'Flow Rate', value: '2.5 gallons per minute' },
        { label: 'Filter Life', value: '6 months or 1,500 gallons' },
        { label: 'Monitoring', value: 'Real-time TDS, pH, flow rate' },
        { label: 'Installation', value: 'Under-sink, DIY friendly' },
        { label: 'Certifications', value: 'NSF/ANSI 53, 42' }
      ],
      'Circadian Light Therapy Lamp': [
        { label: 'Light Output', value: '10,000 LUX at 24 inches' },
        { label: 'Spectrum', value: 'Full spectrum, UV-filtered' },
        { label: 'Color Temperature', value: '2700K-6500K adjustable' },
        { label: 'Timer Options', value: '15, 30, 45, 60 minutes' },
        { label: 'Power', value: '36W LED, Energy Star certified' },
        { label: 'Dimensions', value: '12" x 9" x 2"' },
        { label: 'Warranty', value: '3 years full coverage' }
      ]
    };

    return baseSpecs[product.title] || [
      { label: 'Connectivity', value: 'WiFi + Bluetooth' },
      { label: 'Power', value: 'AC powered' },
      { label: 'App Support', value: 'iOS & Android' },
      { label: 'Warranty', value: '2 years' }
    ];
  };

  const getIntegrationInfo = (product) => {
    return {
      'Air Quality Monitor Pro': {
        platforms: ['Apple HomeKit', 'Google Home', 'Amazon Alexa', 'IFTTT'],
        dataExport: 'CSV, JSON via API',
        automation: 'Trigger air purifiers, HVAC systems based on readings'
      },
      'Sleep Tracking Mat': {
        platforms: ['Apple Health', 'Google Fit', 'Fitbit', 'Sleep Cycle'],
        dataExport: 'Health data sync, sleep reports',
        automation: 'Smart alarm, temperature control, lighting'
      },
      'Smart Water Filter': {
        platforms: ['SmartThings', 'Hubitat', 'Home Assistant'],
        dataExport: 'Water quality logs, usage analytics',
        automation: 'Low filter notifications, usage tracking'
      },
      'Circadian Light Therapy Lamp': {
        platforms: ['Philips Hue', 'LIFX', 'Circadian apps'],
        dataExport: 'Treatment logs, schedule data',
        automation: 'Sunrise simulation, treatment reminders'
      }
    }[product.title] || {
      platforms: ['Major smart home platforms'],
      dataExport: 'Standard data formats',
      automation: 'Custom automation support'
    };
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section style={{ 
      background: 'var(--white)', 
      padding: '4rem 0' 
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Left Column - Tech Explainer */}
          <div>
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                Home Technology
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                color: 'var(--text-sub)',
                lineHeight: 1.6,
                maxWidth: '600px'
              }}>
                Transform your living space with intelligent monitoring and wellness technology. 
                Our devices provide actionable insights for optimized health and comfort.
              </p>
            </div>

            {/* Feature Highlights */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {techFeatures.map(({ icon: Icon, title, description }, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: 'var(--bg)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color="white" />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: '1.1rem', 
                      marginBottom: '0.5rem',
                      color: 'var(--text-primary)'
                    }}>
                      {title}
                    </h4>
                    <p style={{ 
                      color: 'var(--text-sub)',
                      fontSize: '0.95rem',
                      margin: 0,
                      lineHeight: 1.4
                    }}>
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {products.map((product) => {
              const specs = getDeviceSpecs(product);
              const integration = getIntegrationInfo(product);
              const isExpanded = expandedSpec === product.id;

              return (
                <article 
                  key={product.id}
                  className="card"
                  style={{
                    position: 'relative',
                    overflow: 'visible'
                  }}
                >
                  <div style={{ padding: '1.5rem' }}>
                    {/* Device Image */}
                    <div style={{ 
                      position: 'relative',
                      aspectRatio: '4/3',
                      marginBottom: '1.5rem',
                      overflow: 'hidden',
                      borderRadius: 'var(--radius)',
                      background: 'linear-gradient(135deg, var(--bg) 0%, var(--white) 100%)'
                    }}>
                      <img
                        src={product.images[0]?.src}
                        alt={product.images[0]?.alt}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      
                      {/* Tech Badges */}
                      <div style={{ 
                        position: 'absolute', 
                        top: '1rem', 
                        left: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}>
                        {product.badges.map(badge => (
                          <span 
                            key={badge}
                            style={{
                              background: badge.toLowerCase().includes('wifi') || badge.toLowerCase().includes('connected') 
                                ? 'var(--primary)'
                                : badge.toLowerCase().includes('real-time') 
                                ? 'var(--accent)'
                                : '#059669',
                              color: 'white',
                              padding: '0.5rem',
                              borderRadius: 'var(--radius)',
                              fontSize: '0.8rem',
                              fontWeight: '500',
                              textAlign: 'center'
                            }}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '0.75rem',
                      color: 'var(--text-primary)'
                    }}>
                      {product.title}
                    </h3>

                    <p style={{ 
                      color: 'var(--text-sub)',
                      marginBottom: '1.5rem',
                      lineHeight: 1.5
                    }}>
                      {product.short_description}
                    </p>

                    {/* Key Specs Preview */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ 
                        fontSize: '0.95rem', 
                        marginBottom: '0.75rem',
                        color: 'var(--text-primary)'
                      }}>
                        Key Specifications:
                      </h4>
                      <div style={{ 
                        background: 'var(--bg)',
                        padding: '1rem',
                        borderRadius: 'var(--radius)',
                        fontSize: '0.9rem'
                      }}>
                        {specs.slice(0, 3).map((spec, index) => (
                          <div 
                            key={index}
                            style={{ 
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: index < 2 ? '0.5rem' : '0',
                              paddingBottom: index < 2 ? '0.5rem' : '0',
                              borderBottom: index < 2 ? '1px solid var(--border)' : 'none'
                            }}
                          >
                            <span style={{ color: 'var(--text-sub)' }}>
                              {spec.label}:
                            </span>
                            <span style={{ 
                              color: 'var(--text-primary)',
                              fontWeight: '500',
                              textAlign: 'right',
                              flex: 1,
                              marginLeft: '1rem'
                            }}>
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      <button
                        onClick={() => setExpandedSpec(isExpanded ? null : product.id)}
                        className="btn-secondary"
                        style={{ 
                          flex: 1,
                          fontSize: '0.9rem',
                          padding: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        Full Specs
                      </button>

                      <button
                        className="btn-primary"
                        style={{ 
                          flex: 1,
                          fontSize: '0.9rem',
                          padding: '0.75rem'
                        }}
                        onClick={() => {
                          const toast = document.createElement('div');
                          toast.className = 'toast success';
                          toast.innerHTML = 'Added to your tech stack!';
                          toast.setAttribute('aria-live', 'polite');
                          document.body.appendChild(toast);
                          
                          setTimeout(() => toast.remove(), 3000);
                        }}
                      >
                        Add to Kit
                      </button>
                    </div>

                    {/* Integration Link */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // Open integration docs in modal or new page
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                      <ExternalLink size={14} />
                      How it Integrates
                    </a>
                  </div>

                  {/* Expanded Specifications Panel */}
                  {isExpanded && (
                    <div style={{
                      borderTop: '1px solid var(--border)',
                      padding: '1.5rem',
                      background: '#FBFCFD'
                    }}>
                      <h4 style={{ 
                        fontSize: '1.1rem', 
                        marginBottom: '1rem',
                        color: 'var(--text-primary)'
                      }}>
                        Complete Specifications
                      </h4>
                      
                      <div style={{ 
                        display: 'grid',
                        gap: '0.75rem',
                        marginBottom: '2rem'
                      }}>
                        {specs.map((spec, index) => (
                          <div 
                            key={index}
                            style={{ 
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              padding: '0.75rem',
                              background: 'var(--white)',
                              borderRadius: 'var(--radius)',
                              border: '1px solid var(--border)'
                            }}
                          >
                            <span style={{ 
                              color: 'var(--text-sub)',
                              fontWeight: '500',
                              minWidth: '100px'
                            }}>
                              {spec.label}:
                            </span>
                            <span style={{ 
                              color: 'var(--text-primary)',
                              textAlign: 'right',
                              flex: 1,
                              marginLeft: '1rem'
                            }}>
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <h4 style={{ 
                        fontSize: '1.1rem', 
                        marginBottom: '1rem',
                        color: 'var(--text-primary)'
                      }}>
                        Smart Home Integration
                      </h4>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                            Compatible Platforms:
                          </strong>
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '0.5rem',
                            marginTop: '0.5rem'
                          }}>
                            {integration.platforms.map(platform => (
                              <span 
                                key={platform}
                                style={{
                                  background: 'var(--primary)',
                                  color: 'white',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '1rem',
                                  fontSize: '0.8rem',
                                  fontWeight: '500'
                                }}
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                            Data Export:
                          </strong>
                          <p style={{ 
                            margin: '0.5rem 0 0 0',
                            color: 'var(--text-sub)',
                            fontSize: '0.9rem'
                          }}>
                            {integration.dataExport}
                          </p>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                            Automation Features:
                          </strong>
                          <p style={{ 
                            margin: '0.5rem 0 0 0',
                            color: 'var(--text-sub)',
                            fontSize: '0.9rem'
                          }}>
                            {integration.automation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTechGrid;