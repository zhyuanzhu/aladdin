import { exec, config } from '../core'
import { Context } from './types'

// 执行 git init --> git add --> git commit
export default async (ctx: Context): Promise<void> => {
  if (!(ctx.config.init ?? ctx.files.find(i => i.path === '.gitignore') != null)) return

  try {
    const options = {
      cwd: ctx.dest,
      stdio: 'inherit' as 'inherit'
    }
    await exec('git', ['init'], options)
    await exec('git', ['add', '--all'], options)
    await exec('git', ['commit', '-m', config.commitMessage], options)
  } catch (error) {
    
  }
}
