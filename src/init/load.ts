import { Context } from "./types";

/**
 * 加载模版的配置
 */
export default async (ctx: Context): Promise<void> => {
  ctx.config.name = ctx.template
  try {
    const mod = require(ctx.src)
    if (Object.prototype.toString.call(mod) !== '[object Object]') {
      throw new Error('template should expose an object. ')
    }
    Object.assign(ctx.config, mod)
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOND') return
    error.message `Invalid template: ${error.message as string}`
    throw error
  }
}