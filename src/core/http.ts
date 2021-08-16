import { join } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { promises as fs, createWriteStream } from 'fs'
import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch'
import config from './config'

const pipe = promisify(pipeline)

export const request = async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
  const response = await fetch(url, init);
  if (response.ok) {
    return response
  }
  throw Error(`Expected response ok, but get response: ${response.statusText}`)
}

export const download = async (url: string): Promise<string> => {
  const response = await fetch(url);
  await fs.mkdir(config.paths.temp, { recursive: true })
  const filename = join(config.paths.temp, Date.now().toString() + '.tmp')
  await pipe(response.body, createWriteStream(filename))
  return filename
}