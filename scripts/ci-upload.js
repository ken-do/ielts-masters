const process = require('process')
const { exec } = require('./exec')
const { Command } = require('commander')
const { name } = require('../package.json')
const chalk = require('chalk')
const program = new Command()
const log = console.log

;(async function () {
    program
        .option('-t, --tag <tag>', 'docker image tag')
        .option('-i, --aws-account-id <id>', 'AWS account id')
        .option(
            '-r, --region [region]',
            'aws region to deploy to',
            'ap-southeast-1'
        )

    program.parse(process.argv)

    const opts = program.opts()

    console.log('Input values ', opts)

    const region = opts.region
    const awsAccountId = opts.awsAccountId
    const imageNameTag = `${name}:${opts.tag}`

    process.chdir('../')
    log(chalk.yellow(`Authenticate.`))

    await exec(
        `aws ecr get-login-password --region ${region} | docker login --username AWS --password-stdin ${awsAccountId}.dkr.ecr.${region}.amazonaws.com`
    )

    log(chalk.yellow(`Create a new ECR repository if it does not exist.`))
    await exec(
        `aws ecr describe-repositories --repository-names ${name} || aws ecr create-repository --repository-name ${name}
`
    )

    log(chalk.yellow(`Push the docker image to ECR.`))
    await exec(`docker tag ${imageNameTag} ${awsAccountId}.dkr.ecr.${region}.amazonaws.com/${imageNameTag}
        `)

    await exec(
        `docker push ${awsAccountId}.dkr.ecr.${region}.amazonaws.com/${imageNameTag}`
    )
})()
