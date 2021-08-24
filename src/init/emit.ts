import path from 'path'
import { file } from '../core'
import { Context } from './types'

export default async (ctx: Context): Promise<void> => {
  await Promise.all(ctx.files.map(async item => {
    const target = path.join(ctx.dest, item.path)
    await file.write(target, item.contents)
  }))

  if (ctx.config.emit == null) return
  await ctx.config.emit(ctx)
}