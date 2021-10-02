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

    const imageNameTag = `${name}:${opts.tag}`

    log(chalk.yellow(`Start building a new docker image ${imageNameTag}.`))

    process.chdir('../')

    await exec(`docker build . -t ${imageNameTag}`)
    log(chalk.green(`New docker image created ${imageNameTag}.`))
})()
