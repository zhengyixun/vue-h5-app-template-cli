#!/usr/bin/env node

const {program} = require('commander');

const handleInquirer = require('./inquirer')

program
    .command('create <name> [destination]')
    .description('创建项目')
    .action((name, destination) => {
      handleInquirer(name)
    })

program.option('-ig, --init', '初始化')

program.parse(process.argv)