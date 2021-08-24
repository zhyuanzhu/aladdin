import path from 'path'
import semver from 'semver'
import prompts, { PromptObject } from 'prompts'
import valiedateName from 'validate-npm-package-name'
import { config } from '../core'
import { Context } from './types'

export const validator: Record<string, (input: string) => true | string> = {
  name: input => {
    const result = valiedateName(input)
    if (result.validForNewPackages) return true
    return result.errors?.join(', ') ?? result.warnings?.join(',') ?? '' 
  },
  version: input => {
    const valid = semver.valid(input)
    if (valid != null) return true
    return `${input} 不是一个有效的版本`
  },
  email: input => {
    const valid = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(input)
    return valid || `${input} 不是一个有效的有效地址`
  },
  url: input => {
    const valid = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(input)
    return valid || `${input} 不是一个有效的 url 地址`
  }
}

// 校验名称 并 返回一个 prompt
export const processor = (ctx: Context) => (item: PromptObject) => {
  switch (item.name) {
    case 'name':
      item.validate = item.validate ?? validator.name
      break;
  
    default:
      break;
  }
}


// 加载模版的时候的一些问题配置
export default async (ctx: Context): Promise<void> => {
  console.clear()

  // 设置默认名称
  if (ctx.config.prompts == null) {
    ctx.config.prompts = {
      name: 'name',
      type: 'text',
      message: 'Project name'
    }
  }

  if (!Array.isArray(ctx.config.prompts)) {
    ctx.config.prompts = [ctx.config.prompts]
  }

  ctx.config.prompts.forEach(processor(ctx))

}