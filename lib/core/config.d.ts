import envPaths from 'env-paths';
declare const _default: {
    npm: Record<string, any> | undefined;
    git: Record<string, any> | undefined;
    paths: envPaths.Paths;
    ini: (filename: string) => Record<string, any> | undefined;
};
export default _default;
