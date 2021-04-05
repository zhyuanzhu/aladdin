#!/usr/bin/env node

const program = require('commander')

const _VERSION = require('./package.json').version

program.version(_VERSION)

program.parse(process.argv)