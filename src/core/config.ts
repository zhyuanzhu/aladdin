import os from 'os'
import fs from 'fs'
import path from 'path'
import ini from 'ini'
import envPaths from 'env-paths'
import { name } from '../../package.json'

// ini 的作用

// envPaths 根据软件开发规则，将文件缓存至系统的缓存文件夹

const parseIni = (filename: string): Record<string, any> | undefined => {
  try {
    return ini.parse(fs.readFileSync(filename, 'utf-8'))
  } catch {}
}

const defaults = {
  register: '',  // github 模版 url 地址
  branch: 'master',
  commitMessage: 'initial project commit'
}

const config = parseIni(path.join(os.homedir(), `.${name}rc`));

export default {
  ...defaults,
  ...config,
  get npm () {
    return parseIni(path.join(os.homedir(), '.npmrc'))
  },
  get git () {
    return parseIni(path.join(os.homedir(), '.gitconfig'))
  },
  get paths () {
    return envPaths(name, { suffix: undefined })
  },
  ini: parseIni
}