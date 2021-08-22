import cac from "cac";
import init from './index'
import { name, version } from '../package.json';

const cli = cac(name);

cli.command('<template> [project]', '创建一个新 `template` 模版项目 到 `project` 目录')
  .option('-f, --force', '覆盖原有项目')
  .option('-o, --offline', '尝试加载本地模版')
  .allowUnknownOptions()
  .example('    ./|a-zA-Z:|~ 使用 `本地相对路径或绝对路径` 加载一个本地的模版 \n    ./a   C:a    ~Desktop/a')
  .example('    使用 `https?://` 开头的绝对路径加载一个远程模版')
  .action(init)

cli.help().version(version).parse()