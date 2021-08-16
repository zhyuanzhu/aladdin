"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aladding = void 0;
class Aladding {
    constructor() {
        this.middlewares = [];
        // async run (state: T): Promise<void> {
        //   for (let i = 0, len = this.middlewares.length; i < len; i++) {
        //     await this.middlewares[i](state);
        //   }
        // }
    }
    // 挂载中间件
    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    // 按照添加进的顺序，依次执行 middlewares 中的 middleware
    run(state) {
        return this.middlewares.reduce((prev, curr) => prev.then(() => curr(state)), Promise.resolve());
    }
}
exports.Aladding = Aladding;
