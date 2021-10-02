/* eslint-disable import/prefer-default-export */
export const isMobile = () => {
    return (
        Cypress.config('viewportWidth') <
        Cypress.env('mobileViewportWidthBreakpoint')
    )
}
