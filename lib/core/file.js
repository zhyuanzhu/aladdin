"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = exports.remove = exports.mkdir = exports.isEmpty = exports.isDir = exports.isFile = exports.exists = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
        return fs_1.default.promises.unlink(input);
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
