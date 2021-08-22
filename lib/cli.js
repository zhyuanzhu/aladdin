"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const index_1 = __importDefault(require("./index"));
const package_json_1 = require("../package.json");
const cli = cac_1.default(package_json_1.name);
cli.command('<template> [project]', '创建一个新 `template` 模版项目 到 `project` 目录')
    .option('-f, --force', '覆盖原有项目')
    .option('-o, --offline', '尝试加载本地模版')
    .allowUnknownOptions()
    .example('    ./|a-zA-Z:|~ 使用 `本地相对路径或绝对路径` 加载一个本地的模版 \n    ./a   C:a    ~Desktop/a')
    .example('    使用 `https?://` 开头的绝对路径加载一个远程模版')
    .action(index_1.default);
cli.help().version(package_json_1.version).parse();
