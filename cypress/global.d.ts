declare module '@cypress/code-coverage/task'

type CyGetOptions = Parameters<typeof cy.get>[1]

declare namespace Cypress {
    interface Chainable {
        login(): void

        getBySel(
            dataTestAttribute: string,
            options?: CyGetOptions
        ): Chainable<Element>

        getBySelLike(
            dataTestPrefixAttribute: string,
            options?: CyGetOptions
        ): Chainable<Element>

        getByTestId(
            dataTestIdAttribute: string,
            options?: CyGetOptions
        ): Chainable<Element>

        selectedOption(): Chainable
    }
}
