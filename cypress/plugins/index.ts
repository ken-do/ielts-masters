/* eslint-disable no-param-reassign */
import codeCoverageTask from '@cypress/code-coverage/task'
import dotenv from 'dotenv'

dotenv.config()

const getConfig = (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
) => {
    codeCoverageTask(on, config)

    // copy environment variables from .env file to Cypress.env
    config.env.appEnv = process.env.REACT_APP_ENV
    config.env.apimKey = process.env.REACT_APP_APIM_KEY
    config.env.radiomirUri = process.env.REACT_APP_RADIOMIR_URI
    config.env.apiUrl = process.env.REACT_APP_RADIOMIR_API_URL
    config.env.clientId = process.env.REACT_APP_RADIOMIR_CLIENT_ID
    config.env.identityServer = process.env.REACT_APP_RADIOMIR_IDENTITY_SERVER
    config.env.apiVersion = process.env.REACT_APP_API_VERSION

    return config
}

export default getConfig
