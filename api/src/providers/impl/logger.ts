import { ILogger } from "../logger.js";

export class ConsoleLogger implements ILogger {
    constructor() {}
    info(...args: any[]): void {
        console.info(...args);
    }
    error(...args: any[]): void {
        console.error(...args);
    }
    warn(...args: any[]): void {
        console.warn(...args);
    }
    debug(...args: any[]): void {
        console.debug(...args);
    }
}
