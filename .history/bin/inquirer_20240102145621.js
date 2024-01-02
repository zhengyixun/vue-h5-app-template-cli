const inquirer = require('inquirer');
const figlet = require('figlet')
const fs = require('fs');
const ora = require('ora')
const spinner = ora('loading')
const chalk = require('chalk')
const {resolve, cwd} = require('./utils')
const child_process = require('child_process')
const {promisify} = require('util');
const download = promisify(require('download-git-repo'))

function handleInquirer(name){
    
}