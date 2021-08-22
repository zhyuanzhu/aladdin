import os from 'os'
import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'

// 检查输入的路径对应的是什么
export const exists = async (input: string): Promise<false | 'file' | 'dir' | 'other'> => {
  try {
    const stat = await fs.promises.stat(input)
    if (stat.isDirectory()) {
      return 'dir'
    } else if (stat.isFile()) {
      return 'file'
    } else {
      return 'other'
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
    return false
  }
}


// 查看输入的是否是文件
export const isFile = async (input: string): Promise<boolean> => {
  const result = await exists(input);
  return result === 'file';
}

// 查看输入的是否是文件夹
export const isDir = async (input: string): Promise<boolean> => {
  const result = await exists(input);
  return result === 'dir';
}

// 查看文件夹是否为空
export const isEmpty = async (input: string): Promise<boolean> => {
  const files = await fs.promises.readdir(input);
  return files.length === 0;
}

// 创建文件夹
export const mkdir = async (input: string, options?: fs.MakeDirectoryOptions): Promise<void> => {
  await fs.promises.mkdir(input, { recursive: true, ...options })
}

// 删除文件或者文件夹
export const remove = async (input: string, options?: fs.RmDirOptions): Promise<void> => {
  const result = await exists(input);
  // 如果不存在，什么都不做，直接 return 出去
  if (result === false) return;

  // 如果不是 dir
  if (result !== 'dir') return fs.promises.unlink(input);

  //如果是文件夹
  await fs.promises.rmdir(input, { recursive: true, ...options })
}

// 读取 文件
export const read = async (input: string): Promise<Buffer> => {
  return await fs.promises.readFile(input);
}

// 写入
export const write = async (input: string, contents: string | Uint8Array): Promise<void> => {
  await mkdir(path.dirname(input))
  return await fs.promises.writeFile(input, contents);
}

// 格式化 地址
export const untildify = (input: string): string => {
  const home = os.homedir()
  input = input.replace(/^~(?=$|\/|\\)/, home)
  return path.normalize(input)
}

// 
export const tildify = (input: string): string => {
  const home = os.homedir()
  input = path.normalize(input) + path.sep

  if (input.indexOf(home) === 0) {
    input = input.replace(home + path.sep, `~${path.sep}`)
  }
  return input.slice(0, -1)
}

// 解压文件
export const extract = async (input: string, output: string, strip = 0): Promise<void> => await new Promise(resolve => {
  const zip =new AdmZip(input);
  strip === 0 && zip.getEntries().forEach(entry => {
    const items = entry.entryName.split(/\/|\\/)
    const start = Math.min(strip, items.length - 1)
    const stripped = items.slice(start).join('/')
    entry.entryName = stripped === '' ? entry.entryName : stripped
  })
  zip.extractAllToAsync(output, true, err => {
    if (err != null) throw err
    resolve()
  })
})