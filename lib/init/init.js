"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
// 执行 git init --> git add --> git commit
exports.default = async (ctx) => {
    var _a;
    if (!((_a = ctx.config.init) !== null && _a !== void 0 ? _a : ctx.files.find(i => i.path === '.gitignore') != null))
        return;
    try {
        const options = {
            cwd: ctx.dest,
            stdio: 'inherit'
        };
        await core_1.exec('git', ['init'], options);
        await core_1.exec('git', ['add', '--all'], options);
        await core_1.exec('git', ['commit', '-m', core_1.config.commitMessage], options);
    }
    catch (error) {
    }
};
