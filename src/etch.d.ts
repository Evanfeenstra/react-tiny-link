declare global {
    interface Window {
        process: any;
        require: any;
    }
}
export declare function etch(url: any, config: any): Promise<{}>;
export declare function sendIPC(k: string, v: object): Promise<{}>;
