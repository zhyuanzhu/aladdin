"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ini_1 = __importDefault(require("ini"));
const env_paths_1 = __importDefault(require("env-paths"));
const package_json_1 = require("../../package.json");
// ini 的作用
// envPaths 根据软件开发规则，将文件缓存至系统的缓存文件夹
const parseIni = (filename) => {
    try {
        return ini_1.default.parse(fs_1.default.readFileSync(filename, 'utf-8'));
    }
    catch {
        console.log('ini 设置缓存出错～');
    }
};
const defaults = {};
const config = parseIni(path_1.default.join(os_1.default.homedir(), `.${package_json_1.name}rc`));
exports.default = {
    ...defaults,
    ...config,
    get npm() {
        return parseIni(path_1.default.join(os_1.default.homedir(), '.npmrc'));
    },
    get git() {
        return parseIni(path_1.default.join(os_1.default.homedir(), '.gitconfig'));
    },
    get paths() {
        return env_paths_1.default(package_json_1.name, { suffix: undefined });
    },
    ini: parseIni
};
