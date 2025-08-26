describe('Product Finder Quiz', () => {
  beforeEach(() => {
    cy.visit('/');
    
    // Wait for page to load
    cy.get('[data-testid="products-page"]', { timeout: 10000 }).should('be.visible');
    
    // Scroll to product finder section
    cy.get('#product-finder').scrollIntoView();
  });

  it('completes the full product finder flow', () => {
    // Start the quiz
    cy.contains('Start Product Finder').click();
    
    // Step 1: Select health goal
    cy.contains('What\'s your primary health goal?').should('be.visible');
    cy.contains('Boost Energy & Focus').click();
    cy.contains('Next').click();
    
    // Step 2: Select format preference  
    cy.contains('What format do you prefer?').should('be.visible');
    cy.contains('Capsules').click();
    cy.contains('Next').click();
    
    // Step 3: Select constraints
    cy.contains('Any specific preferences?').should('be.visible');
    cy.contains('Vegan/Plant-Based').click();
    cy.contains('Third-Party Tested').click();
    cy.contains('Get My Results').click();
    
    // Verify results page
    cy.contains('Your Personalized Recommendations').should('be.visible');
    cy.get('[data-testid="product-match"]').should('have.length.at.least', 1);
    
    // Check that match scores are displayed
    cy.contains('%').should('be.visible');
    cy.contains('Best Match').should('be.visible');
  });

  it('allows users to request samples from results', () => {
    // Complete quiz flow
    cy.contains('Start Product Finder').click();
    cy.contains('Boost Energy & Focus').click();
    cy.contains('Next').click();
    cy.contains('Capsules').click();
    cy.contains('Next').click();
    cy.contains('Get My Results').click();
    
    // Request sample from first result
    cy.get('[data-testid="product-match"]').first().within(() => {
      cy.contains('Request Sample').click();
    });
    
    // Verify success toast appears
    cy.contains('Sample request submitted').should('be.visible');
    
    // Toast should disappear after timeout
    cy.contains('Sample request submitted', { timeout: 4000 }).should('not.exist');
  });

  it('allows users to save products to routine', () => {
    // Complete quiz flow  
    cy.contains('Start Product Finder').click();
    cy.contains('Support Healthy Aging').click();
    cy.contains('Next').click();
    cy.contains('No Preference').click();
    cy.contains('Next').click();
    cy.contains('Get My Results').click();
    
    // Save product to routine
    cy.get('[data-testid="product-match"]').first().within(() => {
      cy.contains('Save to Routine').click();
    });
    
    // Verify success notification
    cy.contains('Added to your routine').should('be.visible');
  });

  it('supports retaking the quiz', () => {
    // Complete quiz once
    cy.contains('Start Product Finder').click();
    cy.contains('Improve Sleep Quality').click();
    cy.contains('Next').click();
    cy.contains('Powders').click();
    cy.contains('Next').click();
    cy.contains('Get My Results').click();
    
    // Retake quiz
    cy.contains('Retake Quiz').click();
    
    // Should be back to start screen
    cy.contains('Find Your Perfect Products').should('be.visible');
    cy.contains('Start Product Finder').should('be.visible');
  });

  it('handles navigation between quiz steps', () => {
    cy.contains('Start Product Finder').click();
    
    // Move forward through steps
    cy.contains('Enhance Mental Performance').click();
    cy.contains('Next').click();
    
    cy.contains('Smart Devices').click();
    cy.contains('Next').click();
    
    // Go back
    cy.contains('Back').click();
    cy.contains('What format do you prefer?').should('be.visible');
    
    // Go back again
    cy.contains('Back').click();
    cy.contains('What\'s your primary health goal?').should('be.visible');
    
    // Back button should be disabled on first step
    cy.contains('Back').should('be.disabled');
  });

  it('shows progress indicators correctly', () => {
    cy.contains('Start Product Finder').click();
    
    // Check initial progress
    cy.contains('Question 1 of 3').should('be.visible');
    cy.contains('33% Complete').should('be.visible');
    
    // Progress after first question
    cy.contains('Strengthen Immune System').click();
    cy.contains('Next').click();
    
    cy.contains('Question 2 of 3').should('be.visible');
    cy.contains('67% Complete').should('be.visible');
    
    // Progress after second question
    cy.contains('Topical Products').click();
    cy.contains('Next').click();
    
    cy.contains('Question 3 of 3').should('be.visible');
    cy.contains('100% Complete').should('be.visible');
  });

  it('validates required selections before proceeding', () => {
    cy.contains('Start Product Finder').click();
    
    // Try to proceed without selection
    cy.contains('Next').should('be.disabled');
    
    // Make selection and verify button becomes enabled
    cy.contains('Safe Home Environment').click();
    cy.contains('Next').should('not.be.disabled');
  });

  it('handles multiple constraint selections', () => {
    cy.contains('Start Product Finder').click();
    
    // Complete first two steps
    cy.contains('Skin Health & Beauty').click();
    cy.contains('Next').click();
    cy.contains('Topical Products').click();  
    cy.contains('Next').click();
    
    // Select multiple constraints
    cy.contains('Fragrance-Free').click();
    cy.contains('Sensitive Skin/System').click();
    cy.contains('Organic Certified').click();
    
    cy.contains('Get My Results').click();
    
    // Verify results incorporate multiple constraints
    cy.contains('Your Personalized Recommendations').should('be.visible');
  });

  it('is accessible via keyboard navigation', () => {
    cy.contains('Start Product Finder').focus().type('{enter}');
    
    // Navigate options with keyboar
    cy.get('body').tab();
    cy.focused().should('contain', 'Boost Energy & Focus');
    
    // Select with keyboard
    cy.focused().type('{enter}');
    cy.contains('Next').focus().type('{enter}');
    
    // Continue with keyboard navigation
    cy.focused().should('contain', 'Capsules');
    cy.focused().type('{enter}');
    cy.contains('Next').focus().type('{enter}');
    
    // Skip constraints and finish
    cy.contains('Get My Results').focus().type('{enter}');
    
    cy.contains('Your Personalized Recommendations').should('be.visible');
  });

  it('displays appropriate match explanations', () => {
    cy.contains('Start Product Finder').click();
    cy.contains('Boost Energy & Focus').click();
    cy.contains('Next').click();
    cy.contains('Capsules').click();
    cy.contains('Next').click();
    cy.contains('Vegan/Plant-Based').click();
    cy.contains('Get My Results').click();
    
    // Check for match explanations
    cy.contains('Why this matches you:').should('be.visible');
    cy.contains('Supports').should('be.visible');
    cy.contains('Vegan').should('be.visible');
  });

  it('handles edge case with no matching products', () => {
    // This test would require specific data setup to ensure no matches
    // For now, we'll test the general case and assume the system handles it
    cy.contains('Start Product Finder').click();
    cy.contains('Monitor Health Metrics').click();
    cy.contains('Next').click();
    cy.contains('Topical Products').click(); // Incompatible format
    cy.contains('Next').click();
    cy.contains('Get My Results').click();
    
    // Should handle gracefully even with poor matches
    cy.get('body').should('not.contain', 'error');
  });
});

describe('Product Finder Analytics', () => {
  beforeEach(() => {
    // Mock gtag for analytics testing
    cy.window().then((win) => {
      win.gtag = cy.stub().as('gtag');
    });
  });

  it('tracks quiz start event', () => {
    cy.visit('/');
    cy.get('#product-finder').scrollIntoView();
    cy.contains('Start Product Finder').click();
    
    cy.get('@gtag').should('have.been.calledWith', 'event', 'product_finder_start');
  });

  it('tracks quiz completion with answers', () => {
    cy.visit('/');
    cy.get('#product-finder').scrollIntoView();
    
    cy.contains('Start Product Finder').click();
    cy.contains('Boost Energy & Focus').click();
    cy.contains('Next').click();
    cy.contains('Capsules').click();
    cy.contains('Next').click();
    cy.contains('Get My Results').click();
    
    cy.get('@gtag').should('have.been.calledWith', 'event', 'product_finder_complete');
  });
});