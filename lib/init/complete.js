"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallback = void 0;
const fallback = async (ctx) => {
    console.log(`使用 ${ctx.template} 模版在 ${ctx.project} 文件夹中创建了一个新项目`);
    ctx.files.map(i => i.path)
        .sort((a, b) => a > b ? +1 : -1)
        .forEach(i => console.log(`-${i}`));
};
exports.fallback = fallback;
exports.default = async (ctx) => {
    if (ctx.config.complete == null) {
        return await exports.fallback(ctx);
    }
    if (typeof ctx.config.complete === 'string') {
        return console.log(ctx.config.complete);
    }
    const result = await ctx.config.complete(ctx);
    if (result == null)
        return;
    console.log(result);
};
