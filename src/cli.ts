import cac from "cac";
import init from './index'
import { name, version } from '../package.json';

const cli = cac(name);

cli.command('<template> [project]', '创建一个新模版项目')
  .option('-f, --force', '覆盖原有项目')
  .option('-o, --offline', '尝试加载本地模版')
  .allowUnknownOptions()
  .example('    #xx  使用 `#` 开头加载一个远程模版库中的模版 ')
  .example('    ./xx 使用 `./` 相对路径加载一个本地模版')
  .example('    使用 `https?://` 开头的绝对路径加载一个远程模版')
  .action(init)

cli.help().version(version).parse()