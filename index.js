#!/usr/bin/env node

const program = require('commander')

const helpOptions = require('./lib/core/help')

const _VERSION = require('./package.json').version

program.version(_VERSION)

// 增加自定义 options
helpOptions()



program.parse(process.argv)