import { Context } from './types'

// setup hook 
export default async (ctx: Context): Promise<void> => {
  if (ctx.config.setup == null) return
  await ctx.config.setup(ctx)
}