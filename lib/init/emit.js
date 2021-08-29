"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const core_1 = require("../core");
exports.default = async (ctx) => {
    await Promise.all(ctx.files.map(async (item) => {
        const target = path_1.default.join(ctx.dest, item.path);
        await core_1.file.write(target, item.contents);
    }));
    if (ctx.config.emit == null)
        return;
    await ctx.config.emit(ctx);
};
