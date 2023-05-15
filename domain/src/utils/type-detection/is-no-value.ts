import { isExactlyNaN } from "./is-exactly-nan";

export function isNoValue(value: any): boolean {
    return value === undefined || value === null || isExactlyNaN(value);
}
