import path from 'path'
import glob from 'fast-glob'
import { file } from '../core'
import { Context } from './types'


export default async (ctx: Context): Promise<void> => {
  const cwd = path.join(ctx.src, ctx.config.source ?? 'template')

  const filters = ctx.config.filters
  const ignore = filters != null ?
    Object.keys(filters).filter(i => !filters[i](ctx.answers)) : undefined

  const entries = await glob('**', { cwd, ignore, dot: true })

  await Promise.all(entries.map(async entry => {
    const contents = await file.read(path.join(cwd, entry))
    ctx.files.push({ path: entry, contents })
  }))

  if (ctx.config.prepare == null) return
  await ctx.config.prepare(ctx)
}