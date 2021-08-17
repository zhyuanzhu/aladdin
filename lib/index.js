"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.Aladding = exports.file = exports.inject = void 0;
var prompts_1 = require("prompts");
Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return prompts_1.inject; } });
var core_1 = require("./core");
Object.defineProperty(exports, "file", { enumerable: true, get: function () { return core_1.file; } });
Object.defineProperty(exports, "Aladding", { enumerable: true, get: function () { return core_1.Aladding; } });
var init_1 = require("./init");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(init_1).default; } });
