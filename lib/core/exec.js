"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
exports.default = (command, args, options) => new Promise((resolve, reject) => {
    child_process_1.spawn(command, args, options)
        .on('error', reject)
        .on('exit', code => {
        if (code === 0)
            return resolve();
        reject(new Error(`Failed to execute ${command} command.`));
    });
});
