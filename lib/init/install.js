"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
exports.default = async (ctx) => {
    if (ctx.config.install === false)
        return;
    if (ctx.config.install == null) {
        if (ctx.files.find(i => i.path === 'package.json') == null)
            return;
        ctx.config.install = 'npm';
    }
    try {
        const client = ctx.config.install;
        const cmd = process.platform === 'win32' ? `${client}.cmd` : client;
        await core_1.exec(cmd, ['install'], { cwd: ctx.dest, stdio: 'inherit' });
    }
    catch (error) {
        throw new Error('安装依赖失败.');
    }
};
