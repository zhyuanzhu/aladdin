import { RequestInfo, RequestInit, Response } from 'node-fetch';
export declare const request: (url: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
export declare const download: (url: string) => Promise<string>;
