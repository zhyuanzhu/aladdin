/// <reference types="node" />
import fs from 'fs';
export declare const exists: (input: string) => Promise<false | 'file' | 'dir' | 'other'>;
export declare const isFile: (input: string) => Promise<boolean>;
export declare const isDir: (input: string) => Promise<boolean>;
export declare const isEmpty: (input: string) => Promise<boolean>;
export declare const mkdir: (input: string, options?: fs.MakeDirectoryOptions | undefined) => Promise<void>;
export declare const remove: (input: string, options?: fs.RmDirOptions | undefined) => Promise<void>;
export declare const read: (input: string) => Promise<Buffer>;
export declare const write: (input: string, contents: string | Uint8Array) => Promise<void>;
export declare const untildify: (input: string) => string;
export declare const tildify: (input: string) => string;
export declare const extract: (input: string, output: string, strip?: number) => Promise<void>;
