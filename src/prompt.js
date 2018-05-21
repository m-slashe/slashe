let program = require('commander');
let child_process = require('child_process');
let spawn = child_process.spawn;
let Jira = require('./Jira');

let config = require('../config.json');

program
    .command('open')
	.option('-t', '--target', 'Caminho desejado')
    .action(target => {
        let { path } = config['open'][target];
	    child_process.exec('start .', {cwd: path});
    });

program
    .command('start')
    .option('-t', '--target', 'Target')
    .action(target => {
        let {command, arguments, options} = config[target];
        spawn(command, arguments, options);
    });

program
    .command('create-issue <issue>')
    .action(async issueName => {
        try{
            const jira = new Jira();
            let issue = await jira.getIssue(issueName);
            console.log(issue);
        }catch (err){
            console.error(err);
        }
    });

program
    .parse(process.argv);