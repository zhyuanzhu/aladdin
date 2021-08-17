"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../core/index");
const confirm_1 = __importDefault(require("./confirm"));
const creator = new index_1.Aladding();
creator.use(confirm_1.default);
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
