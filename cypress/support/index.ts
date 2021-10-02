// @ts-check
import '@cypress/code-coverage/support'
import 'cypress-localstorage-commands'
import './commands'
import { isMobile } from './utils'

beforeEach(() => {
    // get the the access token from localStorage
    // if it's already there
    cy.restoreLocalStorage()

    // cy.intercept middleware to remove 'if-none-match' headers from all requests
    // to prevent the server from returning cached responses of API requests
    cy.intercept(
        { url: 'https://api.calibers.dev/Radiomir/v1/**', middleware: true },
        // eslint-disable-next-line no-param-reassign
        (req) => delete req.headers['if-none-match']
    )

    // Throttle API responses for mobile testing to simulate real world condition
    if (isMobile()) {
        cy.intercept(
            {
                url: 'https://api.calibers.dev/Radiomir/v1/**',
                middleware: true,
            },
            (req) => {
                req.on('response', (res) => {
                    // Throttle the response to 1 Mbps to simulate a mobile 3G connection
                    res.setThrottle(1000)
                })
            }
        )
    }
})

afterEach(() => {
    // if Cypress successfully fetches the access token
    // the first time it visits the website
    // then we save the keys to the internal snapshot
    // to avoid fetching the keys again for every test
    cy.saveLocalStorage()
})
