const process = require('process')
const { exec } = require('./exec')
const { Command } = require('commander')
const { name } = require('../package.json')
const chalk = require('chalk')
const program = new Command()
const log = console.log

;(async function () {
    program.option('-t, --tag <tag>', 'docker image tag')

    program.parse(process.argv)

    const opts = program.opts()

    console.log('Input values ', opts)

    const containerName = `${name}-${opts.tag}`
    const imageNameTag = `${name}:${opts.tag}`

    process.chdir('../')

    log(chalk.yellow(`Start a container named ${containerName}.`))

    try {
        await exec(
            `docker run -d -p 3000:3000 --name ${containerName} ${imageNameTag}`
        )
        await exec('yarn cypress:run')

        log(chalk.green(`All test passed!`))
    } finally {
        log(chalk.yellow(`Stop a container.`))
        await exec(`docker stop ${containerName}`)

        log(chalk.yellow(`Remove a container.`))
        await exec(`docker rm --force ${containerName}`)
    }
})()
