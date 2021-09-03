"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.request = void 0;
const path_1 = require("path");
const stream_1 = require("stream");
const util_1 = require("util");
const fs_1 = require("fs");
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = __importDefault(require("./config"));
const pipe = util_1.promisify(stream_1.pipeline);
const request = async (url, init) => {
    const response = await node_fetch_1.default(url, init);
    if (response.ok) {
        return response;
    }
    throw Error(`Expected response ok, but get response: ${response.statusText}`);
};
exports.request = request;
const download = async (url) => {
    const response = await exports.request(url);
    await fs_1.promises.mkdir(config_1.default.paths.temp, { recursive: true });
    const filename = path_1.join(config_1.default.paths.temp, Date.now().toString() + '.tmp');
    await pipe(response.body, fs_1.createWriteStream(filename));
    return filename;
};
exports.download = download;
