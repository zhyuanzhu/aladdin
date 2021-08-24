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

const creator = new Aladding<Context>();
creator.use(confirm)
creator.use(resolve)
creator.use(load)
creator.use(inquire)
creator.use(setp)
creator.use(prepare)
creator.use(rename)
creator.use(render)


/**
 * @param { string } template 模版名称 / 地址
 * @param { string } project 项目名称 / 文件夹
 * @param { Options } options 
 */
export default async(template: string, project: string = '.', options: Options = {}): Promise<void> => {
  if (template == null || template == '') {
    throw new Error('模版 `template` 不能为空')
  }

  console.log('模版执行了')

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