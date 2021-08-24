"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../core/index");
const confirm_1 = __importDefault(require("./confirm"));
const resolve_1 = __importDefault(require("./resolve"));
const load_1 = __importDefault(require("./load"));
const inquire_1 = __importDefault(require("./inquire"));
const creator = new index_1.Aladding();
creator.use(confirm_1.default);
creator.use(resolve_1.default);
creator.use(load_1.default);
creator.use(inquire_1.default);
/**
 * @param { string } template 模版名称 / 地址
 * @param { string } project 项目名称 / 文件夹
 * @param { Options } options
 */
exports.default = async (template, project = '.', options = {}) => {
    if (template == null || template == '') {
        throw new Error('模版 `template` 不能为空');
    }
    console.log('模版执行了');
    const context = {
        template,
        project,
        options,
        src: '',
        dest: '',
        config: Object.create(null),
        answers: Object.create(null),
        files: []
    };
    await creator.run(context);
};
