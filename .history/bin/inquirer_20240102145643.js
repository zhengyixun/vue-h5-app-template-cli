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
    inquirer.prompt([
        {
          type: 'input',
          message:'请输入项目名称',
          name: 'projectName',
        },
        {
          type: 'input',
          message:'请输入项目描述',
          name: 'description',
        },
        {
          type: 'confirm',
          message: '是否安装依赖',
          name: 'installerd'
        },
        {
          type: 'list',
          message: '包管理器',
          name: 'package',
          default: 'npm',
          choices: ['npm', 'yarn']
        }
        ])
}