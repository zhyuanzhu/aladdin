import { Answers, PromptObject } from "prompts";

export interface Options {
  // 是否覆盖
  force?: boolean

  // 是否获取本地模版
  offline?: boolean
}

export interface Template {
  // 模版名称
  name: string

  // 版本
  version?: string

  // 模版资源目录
  source?: string

  // 定义预置的数据
  metadata?: Record<string, unknown>

  // 自定义模版一些配置问题
  prompts?: PromptObject | PromptObject[]

  filters?: Record<string, (answers: Answers<string>) => boolean>

  helpers?: Record<string, unknown>

  install?: false | 'npm' | 'yarn'

  init?: boolean

  setup?: (ctx: Context) => Promise<void>

  prepare?: (ctx: Context) => Promise<void>

  emit?: (ctx: Context) => Promise<void>

  complete?: ((ctx: Context) => string | Promise<string> | Promise<void>) | string
}

export interface File {
  // 完整路径
  path: string

  // 内容
  contents: Buffer
}

export interface Context {
  // 模版名称
  readonly template: string

  // 项目名称
  readonly project: string

  // 配置
  readonly options: Options & Record<string, any>


  // 模版的绝对路径地址
  src: string

  // 生成的目标文件的绝对路径
  dest: string

  // 模版配置
  readonly config: Template

  // 用户选择答案
  readonly answers: Answers<string>

  readonly files: File[]

}