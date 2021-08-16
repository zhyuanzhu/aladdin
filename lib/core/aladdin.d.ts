export declare type Middleware<T> = (state: T) => Promise<void> | void;
export declare class Aladding<T> {
    private readonly middlewares;
    use(middleware: Middleware<T>): Aladding<T>;
    run(state: T): Promise<void>;
}
