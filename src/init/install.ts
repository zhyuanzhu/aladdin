import { exec } from '../core'
import { Context } from './types'

export default async (ctx: Context): Promise<void> => {
  if (ctx.config.install === false) return

  if (ctx.config.install == null) {
    if (ctx.files.find(i => i.path === 'package.json') == null) return
    ctx.config.install = 'npm'
  }

  try {
    const client = ctx.config.install
    const cmd = process.platform === 'win32' ? `${client}.cmd` : client
    await exec(cmd, ['install'], { cwd: ctx.dest, stdio: 'inherit' })
  } catch (error) {
    throw new Error('安装依赖失败.')
  }
}