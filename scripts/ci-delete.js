const process = require('process')
const { exec } = require('./exec')
const { Command } = require('commander')
const { name } = require('../package.json')
const chalk = require('chalk')
const program = new Command()
const log = console.log

;(async function () {
    program
        .option('-t, --tag <tag>', 'Docker image tag')
        .option('-e, --environment [env]', 'Target environment', 'dev')
        .option('-h, --hosting-option [hostingOption]', 'Hosting option', 'ec2')

    program.parse(process.argv)

    const opts = program.opts()

    console.log('Input values ', opts)

    const tag = opts.tag
    const environment = opts.environment
    const hostingOption = opts.hostingOption
    const stackName = `${name}-${tag}-${environment}-${hostingOption}`

    log(chalk.yellow(`Terminate app and clean up resources.`))

    await exec(`aws cloudformation delete-stack  --stack-name ${stackName}`)
})()
