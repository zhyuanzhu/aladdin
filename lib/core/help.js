const program = require('commander')

// 自定义 options
const helpOptions = () => {

  program.option('-w --why', '一个 React.js 或者 Vue.js 的项目脚手架')
  program.option('-f --framework <framework>', '项目框架')

}

module.exports = helpOptions