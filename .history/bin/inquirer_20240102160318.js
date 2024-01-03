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
const templateList = {
  'vue-h5-app-template': 'https://github.com/zhengyixun/vue-h5-app-template.git', // 业务级vue移动端脚手架
}
function handleInquirer(name){
    // 输入相关信息
    inquirer.prompt([
      {
        type: 'input',
        message:'请选择模板名称',
        default: name,      // 模板名称
        name: 'templateName',
        default: 'npm',
        choices: ['npm', 'yarn']
      },
        {
          type: 'input',
          message:'请输入项目名称',
          default: name,      // 默认值
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
        ]).then(async ({projectName, description, installerd, package}) => {
            spinner.start('开始初始化')
            await download("direct:https://github.com/zhengyixun/vue-h5-app-template.git", name, {clone: true})
            const packageJSON = fs.readFileSync(resolve(`${name}/package.json`, cwd()), 'utf-8')
            const pkgJSON = JSON.parse(packageJSON)
            pkgJSON.name = projectName || name
            pkgJSON.description = description

            fs.writeFileSync(resolve(`${name}/package.json`, cwd()), JSON.stringify(pkgJSON), {encoding: 'utf-8'})
            spinner.succeed(chalk.green('初始化完成'))

            console.log(`installerd`, installerd)
            if (installerd) {
                const command = package == 'npm' ? 'npm install' : 'yarn'
                spinner.start( command )

                const child = child_process.exec(`cd ${name} && ${command}`, {encoding: 'utf-8'})
                child.stdout?.on('data', data=> {
                    console.log('stdout', data)
                })
                child.stderr?.on('data', err => {
                    console.log('stderr', err)
                })
                child.on('close', () => {
                  endHandle(pkgJSON.name, package)
                })
            }else{
              endHandle(pkgJSON.name, package)
            }
        })
}
function endHandle(name,package){
  spinner.succeed(chalk.green('依赖安装成功'))
  console.log(`enter this project and exec command`)
  console.log(`    cd ${name}`)
  console.log(`    ${package} dev`)
  console.log(`    ${package} build`)
}
module.exports = handleInquirer