"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateUrl = exports.getTemplatePath = void 0;
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const ora_1 = __importDefault(require("ora"));
const core_1 = require("../core");
// 获取 本地模版地址
const getTemplatePath = async (input) => {
    const localPath = /^[./]|^[a-zA-Z]:|^~[/\\]/;
    if (!localPath.test(input))
        return false;
    const dir = path_1.default.resolve(core_1.file.untildify(input));
    const isDir = await core_1.file.exists(dir) === 'dir';
    if (isDir)
        return dir;
    throw new Error(`Local path '${input}' is not found`);
};
exports.getTemplatePath = getTemplatePath;
// 获取远程模版
const getTemplateUrl = async (input) => {
    if (/^https?/.test(input))
        return input;
    return core_1.config.register = input;
};
exports.getTemplateUrl = getTemplateUrl;
exports.default = async (ctx) => {
    const dir = await exports.getTemplatePath(ctx.template);
    if (dir !== false) {
        ctx.src = dir;
        return;
    }
    const url = await exports.getTemplateUrl(ctx.template);
    // 设置 url hash
    const hash = crypto_1.default.createHash('md5').update(url).digest('hex').substr(8, 16);
    // 将模版 缓存
    ctx.src = path_1.default.join(core_1.config.paths.cache, hash);
    // 查看缓存是否存在
    const exists = await core_1.file.isDir(ctx.src);
    if (ctx.options.offline != null && ctx.options.offline) {
        if (exists) {
            return console.log(`Using cached template: \`${core_1.file.tildify(ctx.src)}\`.`);
        }
        console.log(`Cache not fount: \`${core_1.file.tildify(ctx.src)}\`.`);
    }
    exists && await core_1.file.remove(ctx.src);
    const spinner = ora_1.default('Downloading template...').start();
    try {
        const temp = await core_1.http.download(url);
        await core_1.file.extract(temp, ctx.src, 1);
        await core_1.file.remove(temp);
        spinner.succeed('Download template complete.');
    }
    catch (error) {
        spinner.stop();
        throw new Error(`Failed to pull \`${ctx.template}\` template: ${error.message}`);
    }
};
