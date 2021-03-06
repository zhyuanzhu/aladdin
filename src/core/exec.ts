import { spawn, SpawnOptions } from 'child_process'

export default (command: string, args: string[], options: SpawnOptions): Promise<void> => new Promise((resolve, reject) => {
  spawn(command, args, options)
  .on('error', reject)
  .on('exit', code => {
    if (code === 0) return resolve()
    reject(new Error(`Failed to execute ${command} command.`))
  })
})