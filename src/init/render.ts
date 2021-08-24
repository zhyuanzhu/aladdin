import _ from 'lodash'
import { file } from '../core'
import { Context } from './types'

export default async (ctx: Context): Promise<void> => {
  const reg = /<%([\s\S]+?)%>/
  const imports = {
    ...ctx.config.metadata,
    ...ctx.config.helpers
  }

  ctx.files.forEach(item => {
    if (file.isBinary(item.contents)) return
    const text = item.contents.toString()

    if (!reg.test(text)) return
    const compiled = _.template(text, { imports })
    const newContents = compiled(ctx.answers)
    item.contents = Buffer.from(newContents)
  })
}