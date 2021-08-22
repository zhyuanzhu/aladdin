import path from 'path'
import crypto from 'crypto'
import ora from 'ora'
import { file, http, config } from '../core'
import { Context } from './types'

// 获取 本地模版地址
export const getTemplatePath = async (input: string): Promise<false | string> => {
  const localPath = /^[./]|^[a-zA-Z]:|^~[/\\]/
  if (!localPath.test(input)) return false;
  const dir = path.resolve(file.untildify(input));
  const isDir = await file.exists(dir) === 'dir'
  if (isDir) return dir
  throw new Error(`Local path '${input}' is not found`)
}

// 获取远程模版
export const getTemplateUrl = async (input: string): Promise<string> => {
  if (/^https?/.test(input)) return input;
  return config.register = input
}


export default async (ctx: Context): Promise<void> => {

  const dir = await getTemplatePath(ctx.template)
  
  if (dir !== false) {
    ctx.src =dir
    return
  }

  const url = await getTemplateUrl(ctx.template);

  // 设置 url hash
  const hash = crypto.createHash('md5').update(url).digest('hex').substr(8, 16);

  // 将模版 缓存
  ctx.src = path.join(config.paths.cache, hash)

  // 查看缓存是否存在
  const exists = await file.isDir(ctx.src)
  if (ctx.options.offline != null && ctx.options.offline) {
    if (exists) {
      return console.log(`Using cached template: \`${file.tildify(ctx.src)}\`.`)
    }

    console.log(`Cache not fount: \`${file.tildify(ctx.src)}\`.`)
  }

  exists && await file.remove(ctx.src)

  const spinner = ora('Downloading template...').start()
  try {
    const temp = await http.download(url)
    await file.extract(temp, ctx.src, 1)
    await file.remove(temp)
    spinner.succeed('Download template complete.')
  } catch (error) {
    spinner.stop()
    throw new Error(`Failed to pull \`${ctx.template}\` template: ${error.message as string}`)
  }

}