#!/usr/bin/env node

let program = require('commander');

program
	.command('open')
	.action(() => {
		console.log('open called');
	})

program
	.parse(process.argv);