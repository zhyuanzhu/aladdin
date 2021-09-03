import { Context } from './types'

export const fallback = async (ctx: Context): Promise<void> => {
  console.log(`使用 ${ctx.template} 模版在 ${ctx.project} 文件夹中创建了一个新项目`)
  // 对文件按照首字母排序
  ctx.files.map(i => i.path)
    .sort((a, b) => a > b ? +1 : -1)
    .forEach(i => console.log(`-${i}`))
  console.log(`使用愉快 #、#  \n :)`)
}

export default async (ctx: Context): Promise<void> => {
  if (ctx.config.complete == null) {
    return await fallback(ctx)
  }

  if (typeof ctx.config.complete === 'string') {
    return console.log(ctx.config.complete)
  }

  const result = await ctx.config.complete(ctx);
  if (result == null) return
  console.log(result)
}