"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const package_json_1 = require("../package.json");
const cli = cac_1.default(package_json_1.name);
cli.command('<template> [project]', '创建一个新模版项目')
    .option('-f, --force', '覆盖原有项目')
    .option('-o, --offline', '尝试加载本地模版')
    .allowUnknownOptions()
    .example('  #xx 使用 `#` 开头加载一个远程模版库中的模版 ')
    .example('  ./ 使用 `./` 相对路径加载一个本地模版')
    .example('  使用 `https?://` 开头的绝对路径加载一个远程模版');
cli.help().version(package_json_1.version).parse();
