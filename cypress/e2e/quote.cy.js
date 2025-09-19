describe('Quote Explorer App', () => {
beforeEach(() => {
  cy.visit('/'); 
});

  it('App loads successfully and shows a quote on first load', () => {
    // Check that the main elements are present
    cy.contains('Quote Explorer').should('be.visible');
    cy.get('#quote-text').should('be.visible');
    cy.get('#quote-author').should('be.visible');
    
    // Wait for the quote to load (should not be loading text)
    cy.get('#quote-text').should('not.contain', 'Loading...');
    
    // Check that a quote is displayed (should contain quotation marks)
    cy.get('#quote-text').should('contain', '"');
    
    // Check that an author is displayed
    cy.get('#quote-author').should('not.be.empty');
    cy.get('#quote-author').should('contain', '—');
  });

  it('New Quote button works and changes the displayed quote', () => {
    // Wait for initial quote to load
    cy.get('#quote-text').should('not.contain', 'Loading...');
    
    // Get the initial quote text
    cy.get('#quote-text').then(($initialQuote) => {
      const initialText = $initialQuote.text();
      
      // Click the New Quote button
      cy.get('#new-quote-btn').click();
      
      // Wait for loading to start and finish
      cy.get('#quote-text').should('contain', 'Loading...');
      cy.get('#quote-text').should('not.contain', 'Loading...');
      
      // Verify that the quote has changed
      cy.get('#quote-text').should('not.contain', initialText);
      
      // Verify new quote has proper format
      cy.get('#quote-text').should('contain', '"');
      cy.get('#quote-author').should('contain', '—');
    });
  });



it('Error handling works when API request fails', () => {
  // Intercept the API call and force  to fail
  cy.intercept('GET', '**/quotes/random', {
    statusCode: 500,
    body: { error: 'Internal Server Error' }
  }).as('getRandomQuoteError');

  cy.reload();

  cy.wait('@getRandomQuoteError');

  cy.get('#error-container').should('be.visible');
  cy.get('#error-message').should('contain', 'Failed to fetch quote');

  cy.get('#retry-btn').should('be.visible');

  cy.get('#quote-text').should('be.empty');
  cy.get('#quote-author').should('be.empty');
});

it('Copy Quote feature works', () => {
    
    cy.get('#quote-text').should('not.contain', 'Loading...');
    
    
    cy.get('#copy-quote-btn').click();
    
    // Check that success message appears
    cy.get('#success-message').should('be.visible');
    cy.get('#success-message').should('contain', 'copied to clipboard');
    
    // Success message should disappear after a few seconds
    cy.wait(2500);
    cy.get('#success-message').should('not.be.visible');
  });

  it('Search feature works with valid keyword', () => {
    // Type a search term
    cy.get('#search-input').type('life');
    
    // Click search button
    cy.get('#search-btn').click();
    
    
    cy.get('#quote-text').should('contain', 'Loading...');
    cy.get('#quote-text').should('not.contain', 'Loading...');
    
    
    cy.get('#quote-text').should('contain', '"');
    cy.get('#quote-author').should('contain', '—');
  });

  it('Search feature handles no results gracefully', () => {
    cy.get('#search-input').type('xyz12jhghghjkhjh');
    
    cy.get('#search-btn').click();
    
   
    cy.get('#quote-text').should('contain', 'Loading...');
    
   
    cy.get('#error-container').should('be.visible');
    cy.get('#error-message').should('contain', 'No quotes found');
  });

  it('Search works with Enter key', () => {

    cy.get('#search-input').type('success{enter}');
    
   
    cy.get('#quote-text').should('contain', 'Loading...');
    cy.get('#quote-text').should('not.contain', 'Loading...');
    
   
    cy.get('#quote-text').should('contain', '"');
    cy.get('#quote-author').should('contain', '—');
  });

  it('Buttons are disabled during loading', () => {
    // Click New Quote button
    cy.get('#new-quote-btn').click();
    
    cy.get('#quote-text').should('contain', 'Loading...');
    cy.get('#new-quote-btn').should('be.disabled');
    cy.get('#copy-quote-btn').should('be.disabled');
    cy.get('#search-btn').should('be.disabled');
    
    cy.get('#quote-text').should('not.contain', 'Loading...');
    cy.get('#new-quote-btn').should('not.be.disabled');
    cy.get('#copy-quote-btn').should('not.be.disabled');
    cy.get('#search-btn').should('not.be.disabled');
  });
});