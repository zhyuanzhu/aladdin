import { Aladding } from '../core/index'
import { Context, Options, File } from './types'
import confirm from './confirm'
import resolve from './resolve'
import load from './load'
import inquire from './inquire'
import setp from './setp'
import prepare from './prepare'
import rename from './rename'
import render from './render'
import emit from './emit'
import install from './install'
import init from './init'
import complete from './complete'

const creator = new Aladding<Context>();
creator.use(confirm)
creator.use(resolve)
creator.use(load)
creator.use(inquire)
creator.use(setp)
creator.use(prepare)
creator.use(rename)
creator.use(render)
creator.use(emit)
creator.use(install)
creator.use(init)
creator.use(complete)


/**
 * @param { string } template 模版名称 / 地址
 * @param { string } project 项目名称 / 文件夹
 * @param { Options } options 
 */
export default async(template: string, project: string = '.', options: Options = {}): Promise<void> => {
  if (template == null || template == '') {
    throw new Error('模版 `template` 不能为空')
  }

  const context: Context = {
    template,
    project,
    options,
    src: '',
    dest: '',
    config: Object.create(null),
    answers: Object.create(null),
    files: []
  }
  await creator.run(context)
}

export { Context, Options, File }