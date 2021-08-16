// 定义中间件类型
export type Middleware<T> = (state: T) => Promise<void> | void;

export class Aladding<T> {
  private readonly middlewares: Array<Middleware<T>> = []

  // 挂载中间件
  use (middleware: Middleware<T>): Aladding<T> {
    this.middlewares.push(middleware);
    return this;
  }

  // 按照添加进的顺序，依次执行 middlewares 中的 middleware
  run (state: T): Promise<void> {
    return this.middlewares.reduce(
      (prev, curr) => prev.then(() => curr(state)), 
      Promise.resolve()
    )
  }

  // async run (state: T): Promise<void> {
  //   for (let i = 0, len = this.middlewares.length; i < len; i++) {
  //     await this.middlewares[i](state);
  //   }
  // }

}