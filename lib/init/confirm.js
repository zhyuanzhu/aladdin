"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const index_1 = require("../core/index");
exports.default = async (ctx) => {
    ctx.dest = path_1.default.resolve(ctx.project);
    const exists = await index_1.file.exists(ctx.dest);
    if (exists === false)
        return;
    // 如果传入了 force
    if (ctx.options.force != null && ctx.options.force) {
        return await index_1.file.remove(ctx.dest);
    }
    // 查看传入的 路径是否是 dir
    if (exists !== 'dir') {
        throw new Error(`${ctx.project} 不是一个文件夹`);
    }
    const isEmptyFile = await index_1.file.isEmpty(ctx.dest);
    if (isEmptyFile)
        return;
    // 判断是否在当前文件夹里面执行
    const isCurrentFile = process.cwd() === ctx.dest;
    const { choose } = await prompts_1.default([
        {
            name: 'sure',
            type: 'confirm',
            message: isCurrentFile ? '在当前目录创建？' : '目标文件已存在，是否继续？'
        },
        {
            name: 'choose',
            type: (prev) => prev ? 'select' : null,
            message: `${isCurrentFile ? '当前' : '目标'} 文件夹不是一个空文件夹，请选择处理方式`,
            hint: ' ',
            choices: [
                { title: '合并', value: 'merge' },
                { title: '覆盖', value: 'overwrite' },
                { title: '取消', value: 'cancel' },
            ]
        }
    ]);
    if (choose == null || choose == 'cancel') {
        throw new Error('取消当前任务');
    }
    if (choose === 'overwrite') {
        await index_1.file.remove(ctx.dest);
    }
};
