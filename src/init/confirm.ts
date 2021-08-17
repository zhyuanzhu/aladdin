import path from 'path'
import prompts from 'prompts'
import { file } from '../core/index'
import { Context } from './types'

export default async(ctx: Context): Promise<void> => {
  
  ctx.dest = path.resolve(ctx.project)

  const exists = await file.exists(ctx.dest);
  if (exists === false) return

  // 如果传入了 force
  if (ctx.options.force != null && ctx.options.force) {
    return await file.remove(ctx.dest)
  }

  // 查看传入的 路径是否是 dir
  if (exists !== 'dir') {
    throw new Error(`${ctx.project} 不是一个文件夹`)
  }

  const isEmptyFile = await file.isEmpty(ctx.dest)
  if (isEmptyFile) return

  // 判断是否在当前文件夹里面执行
  const isCurrentFile = process.cwd() === ctx.dest;

  const { choose }: { choose?: string } = await prompts([
    {
      name: 'sure',
      type: 'confirm',
      message: isCurrentFile ? '在当前目录创建？' : '目标文件已存在，是否继续？'
    },
    {
      name: 'choose',
      type: (prev: boolean) => prev ? 'select' : null,
      message: 'xxxx',
      hint: ' ',
      choices: [
        { title: 'a', value: 'a' },
        { title: 'b', value: 'b' },
        { title: 'c', value: 'c' },
      ]
    }
  ])

  console.log(choose)

}