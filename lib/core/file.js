"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = exports.tildify = exports.untildify = exports.write = exports.read = exports.remove = exports.mkdir = exports.isBinary = exports.isEmpty = exports.isDir = exports.isFile = exports.exists = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const adm_zip_1 = __importDefault(require("adm-zip"));
// 检查输入的路径对应的是什么
const exists = async (input) => {
    try {
        const stat = await fs_1.default.promises.stat(input);
        if (stat.isDirectory()) {
            return 'dir';
        }
        else if (stat.isFile()) {
            return 'file';
        }
        else {
            return 'other';
        }
    }
    catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
        return false;
    }
};
exports.exists = exists;
// 查看输入的是否是文件
const isFile = async (input) => {
    const result = await exports.exists(input);
    return result === 'file';
};
exports.isFile = isFile;
// 查看输入的是否是文件夹
const isDir = async (input) => {
    const result = await exports.exists(input);
    return result === 'dir';
};
exports.isDir = isDir;
// 查看文件夹是否为空
const isEmpty = async (input) => {
    const files = await fs_1.default.promises.readdir(input);
    return files.length === 0;
};
exports.isEmpty = isEmpty;
// 查看是否 binary
const isBinary = (input) => {
    return input.some(item => item === 65533 || item <= 8);
};
exports.isBinary = isBinary;
// 创建文件夹
const mkdir = async (input, options) => {
    await fs_1.default.promises.mkdir(input, { recursive: true, ...options });
};
exports.mkdir = mkdir;
// 删除文件或者文件夹
const remove = async (input, options) => {
    const result = await exports.exists(input);
    // 如果不存在，什么都不做，直接 return 出去
    if (result === false)
        return;
    // 如果不是 dir
    if (result !== 'dir')
        return await fs_1.default.promises.unlink(input);
    //如果是文件夹
    await fs_1.default.promises.rmdir(input, { recursive: true, ...options });
};
exports.remove = remove;
// 读取 文件
const read = async (input) => {
    return await fs_1.default.promises.readFile(input);
};
exports.read = read;
// 写入
const write = async (input, contents) => {
    await exports.mkdir(path_1.default.dirname(input));
    return await fs_1.default.promises.writeFile(input, contents);
};
exports.write = write;
// 格式化 地址
const untildify = (input) => {
    const home = os_1.default.homedir();
    input = input.replace(/^~(?=$|\/|\\)/, home);
    return path_1.default.normalize(input);
};
exports.untildify = untildify;
// 处理成绝对路径
const tildify = (input) => {
    const home = os_1.default.homedir();
    input = path_1.default.normalize(input) + path_1.default.sep;
    if (input.indexOf(home) === 0) {
        input = input.replace(home + path_1.default.sep, `~${path_1.default.sep}`);
    }
    return input.slice(0, -1);
};
exports.tildify = tildify;
// 解压文件
const extract = async (input, output, strip = 0) => await new Promise(resolve => {
    const zip = new adm_zip_1.default(input);
    strip === 0 || zip.getEntries().forEach(entry => {
        const items = entry.entryName.split(/\/|\\/);
        const start = Math.min(strip, items.length - 1);
        const stripped = items.slice(start).join('/');
        entry.entryName = stripped === '' ? entry.entryName : stripped;
    });
    zip.extractAllToAsync(output, true, err => {
        if (err != null)
            throw err;
        resolve();
    });
});
exports.extract = extract;
