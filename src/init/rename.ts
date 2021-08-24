import { Context } from './types'

export default async (ctx: Context): Promise<void> => {
  const reg = /{(\w+)}/g
  ctx.files.forEach(item => {
    if (!reg.test(item.path)) return
    item.path = item.path.replace(reg, (_, key) => ctx.answers[key])
  })
}