import { Aladding } from '../core/index'
import { Context, Options, File } from './types'
import confirm from './confirm'

const creator = new Aladding<Context>();
creator.use(confirm)



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