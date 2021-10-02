const { Command } = require('commander')
const program = new Command()

program
    .version('0.0.1')
    .description('CI pipeline commands')
    .command('build', 'build a new docker image')
    .command('test', 'launch a new docker container and trigger e2e tests')
    .command('upload', 'upload the built image to ECR')
    .command('deploy', 'deploy the app to test env')
    .command('delete', 'Terminate the app & clean up resources')

program.parse(process.argv)
