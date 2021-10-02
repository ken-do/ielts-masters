const util = require('util')
const exec = util.promisify(require('child_process').exec)
const chalk = require('chalk')
const log = console.log

async function customExec(command) {
    const promise = exec(command)
    const child = promise.child

    child.stdout.on('data', (data) => {
        log(chalk.white(`STDOUT.: ${data}`))
    })

    child.stderr.on('data', (data) => {
        log(chalk.blue(`STDERR: ${data}`))
    })

    child.on('exit', (code) => {
        if (code === 0) {
            log(
                chalk.green(
                    `Command finished successfully.\n------------------------------`
                )
            )
        } else {
            log(chalk.red(`child process exited with code ${code}`))
        }
    })

    child.on('error', (err) => {
        if (err) {
            log(chalk.red(err))
            process.exit(1)
        }
    })

    return promise
}

module.exports.exec = customExec
