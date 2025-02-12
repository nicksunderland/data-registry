describe('Hermes Upload', {retries: 0}, () => {
  it('uploads a dataset', () => {
    cy.intercept('POST', '**/api/login').as('loginRequest');
    cy.intercept('POST', '**/api/validate-hermes').as('validateRequest');
    cy.visit('/hermes/login');
    cy.get('input[id="email"]').type('uploader1');
    cy.get('input[type="password"]').type('password');
    cy.contains('button', 'Sign In').click();
    cy.wait('@loginRequest');
    cy.visit('/hermes/new', { timeout: 10000 });
    const datasetName = `Cypress dataset ${new Date().getTime()}`;
    cy.get('#dataSetName').type(datasetName);
    cy.get('#cohort').type('UKBiobank');
    cy.get('#contactPerson').type('Point of Contact');
    cy.get('#dataCollectionStart').type('2006/01/01{enter}');
    cy.wait(500);
    cy.get('[data-cy="sex"]').type('Male').type('{enter}');
    cy.get('#dataCollectionEnd').type('2006/01/31{enter}');
    cy.get('[data-cy="ancestry"]').type('European').type('{enter}');
    cy.get('[data-cy="case-ascertainment"]').eq(0).type('Electronic').type('{enter}');
    cy.get("#phenotype").type('All heart failure').wait(400);
    cy.get('.p-autocomplete-item').eq(0).click();
    cy.get("#caseDefinition").type("My case definition");
    cy.get("#totalSampleSize").type("989");
    cy.get("#maleProportionCohort").type("1");
    cy.get('#callingAlgorithm').type("You called, algorithm?");
    cy.get('#genotypingArray').type("Array against you");
    cy.get('[data-cy="referenceGenome"]').type('Hg19').type('{enter}');blur()
    cy.get('#imputationSoftware').type('Imputate this software');
    cy.get('#imputationReference').type('Imputation reference');
    cy.get('#numberOfVariantsForImputation').type('47');
    cy.get('#imputationQualityMeasure').type('highest quality');
    cy.get('[data-cy="relatedIndividualsRemoved"]').type('Yes').type('{enter}');
    cy.get('#variantCallRate').type('.22');
    cy.get('#sampleCallRate').type('.2247');
    cy.get('#hwePValue').type('.09121');
    cy.get('#maf').type('1');
    cy.get('#otherFilters').type('My Filters');

    cy.get('input[type="file"]').attachFile('sample-gwas-expanded.csv');
    cy.get('[data-cy="column-dropdown"]').eq(1).type('chromosome').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(2).type('position').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(3).type('alt').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(4).type('reference').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(5).type('eaf').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(6).type('beta').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(7).type('stdErr').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(8).type('pValu').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(11).type('oddsRatio').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(12).type('oddsRatioLB').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(13).type('oddsRatioUB').type('{enter}');
    cy.get('[data-cy="column-dropdown"]').eq(14).type('N').type('{enter}');
    cy.get('button[aria-label="Upload"]').click();
    cy.wait('@validateRequest');
    cy.wait(500);
    cy.location('pathname').should('eq', '/hermes');
    cy.contains(datasetName).should('be.visible');
  });
});
