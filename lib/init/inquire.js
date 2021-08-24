"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processor = exports.validator = void 0;
const path_1 = __importDefault(require("path"));
const semver_1 = __importDefault(require("semver"));
const prompts_1 = __importDefault(require("prompts"));
const validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
const core_1 = require("../core");
exports.validator = {
    name: input => {
        var _a, _b, _c, _d;
        const result = validate_npm_package_name_1.default(input);
        if (result.validForNewPackages)
            return true;
        return (_d = (_b = (_a = result.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) !== null && _b !== void 0 ? _b : (_c = result.warnings) === null || _c === void 0 ? void 0 : _c.join(',')) !== null && _d !== void 0 ? _d : '';
    },
    version: input => {
        const valid = semver_1.default.valid(input);
        if (valid != null)
            return true;
        return `${input} 不是一个有效的版本`;
    },
    email: input => {
        const valid = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(input);
        return valid || `${input} 不是一个有效的有效地址`;
    },
    url: input => {
        const valid = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(input);
        return valid || `${input} 不是一个有效的 url 地址`;
    }
};
// 校验名称 并 返回一个 prompt
const processor = (ctx) => (item) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
    switch (item.name) {
        case 'name':
            item.validate = (_a = item.validate) !== null && _a !== void 0 ? _a : exports.validator.name;
            item.initial = (_b = item.initial) !== null && _b !== void 0 ? _b : path_1.default.basename(ctx.dest);
            break;
        case 'version':
            item.validate = (_c = item.validate) !== null && _c !== void 0 ? _c : exports.validator.version;
            item.initial = (_f = (_d = item.initial) !== null && _d !== void 0 ? _d : (_e = core_1.config.npm) === null || _e === void 0 ? void 0 : _e['init-version']) !== null && _f !== void 0 ? _f : '0.0.1';
            break;
        case 'author':
            item.initial = (_j = (_g = item.initial) !== null && _g !== void 0 ? _g : (_h = core_1.config.npm) === null || _h === void 0 ? void 0 : _h['init-author-name']) !== null && _j !== void 0 ? _j : (_l = (_k = core_1.config.git) === null || _k === void 0 ? void 0 : _k.user) === null || _l === void 0 ? void 0 : _l.name;
            break;
        case 'email':
            item.validate = (_m = item.validate) !== null && _m !== void 0 ? _m : exports.validator.email;
            item.initial = (_q = (_o = item.initial) !== null && _o !== void 0 ? _o : (_p = core_1.config.npm) === null || _p === void 0 ? void 0 : _p['init-author-email']) !== null && _q !== void 0 ? _q : (_s = (_r = core_1.config.git) === null || _r === void 0 ? void 0 : _r.user) === null || _s === void 0 ? void 0 : _s.email;
            break;
        case 'url':
            item.validate = (_t = item.validate) !== null && _t !== void 0 ? _t : exports.validator.url;
            item.initial = (_w = (_u = item.initial) !== null && _u !== void 0 ? _u : (_v = core_1.config.npm) === null || _v === void 0 ? void 0 : _v['init-author-url']) !== null && _w !== void 0 ? _w : (_y = (_x = core_1.config.git) === null || _x === void 0 ? void 0 : _x.user) === null || _y === void 0 ? void 0 : _y.url;
            break;
    }
};
exports.processor = processor;
// 加载模版的时候的一些问题配置
exports.default = async (ctx) => {
    console.clear();
    // 设置默认名称
    if (ctx.config.prompts == null) {
        ctx.config.prompts = {
            name: 'name',
            type: 'text',
            message: 'Project name'
        };
    }
    if (!Array.isArray(ctx.config.prompts)) {
        ctx.config.prompts = [ctx.config.prompts];
    }
    ctx.config.prompts.forEach(exports.processor(ctx));
    prompts_1.default.override(ctx.options);
    const onCancel = () => {
        throw new Error('已经取消了当前任务.');
    };
    Object.assign(ctx.answers, await prompts_1.default(ctx.config.prompts, { onCancel }));
};
