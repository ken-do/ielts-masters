/* eslint-disable @typescript-eslint/triple-slash-reference */
// @ts-check
/// <reference path="../global.d.ts" />

// More details about these commands: https://docs.cypress.io/guides/references/best-practices#Real-World-Example
Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args)
})

Cypress.Commands.add('getByTestId', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add(
    'selectedOption',
    { prevSubject: 'element' },
    (subject) => {
        return cy.wrap(subject).find('option:selected')
    }
)
