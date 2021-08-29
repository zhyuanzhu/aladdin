"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (ctx) => {
    const reg = /{(\w+)}/g;
    ctx.files.forEach(item => {
        if (!reg.test(item.path))
            return;
        item.path = item.path.replace(reg, (_, key) => ctx.answers[key]);
    });
};
