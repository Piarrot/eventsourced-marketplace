import { Result } from "./index.js";

export const ParsingError = {
    SHOULD_BE_STRING: "SHOULD_BE_STRING",
    SHOULD_BE_EMAIL: "SHOULD_BE_EMAIL",
    SHOULD_BE_NUMBER: "SHOULD_BE_NUMBER",
    SHOULD_BE_ARRAY: "SHOULD_BE_ARRAY",
    ARRAY_LESS_THAN_MIN: "ARRAY_LESS_THAN_MIN",
    ARRAY_GREATER_THAN_MAX: "ARRAY_GREATER_THAN_MAX",
    ARRAY_INVALID_TYPE: "ARRAY_INVALID_TYPE",
    SHOULD_BE_BOOLEAN: "SHOULD_BE_BOOLEAN",
} as const;

export type ParsingError = (typeof ParsingError)[keyof typeof ParsingError];

export type STRING_ERROR = typeof ParsingError.SHOULD_BE_STRING;
export type EMAIL_ERROR = typeof ParsingError.SHOULD_BE_EMAIL;
export type NUMBER_ERROR = typeof ParsingError.SHOULD_BE_NUMBER;
export type ARRAY_ERROR =
    | typeof ParsingError.SHOULD_BE_ARRAY
    | typeof ParsingError.ARRAY_LESS_THAN_MIN
    | typeof ParsingError.ARRAY_GREATER_THAN_MAX
    | typeof ParsingError.ARRAY_INVALID_TYPE;

export type BOOLEAN_ERROR = typeof ParsingError.SHOULD_BE_BOOLEAN;

export interface ParsingOptions {
    optional?: boolean;
}

export function parseString(
    value: any,
    opts?: ParsingOptions
): Result<string, STRING_ERROR> {
    if (opts?.optional && value === undefined) {
        return Result.success(value);
    }

    if (typeof value !== "string") {
        return Result.fail(ParsingError.SHOULD_BE_STRING);
    }

    return Result.success(value);
}

export function parseEmail(
    value: any,
    opts?: ParsingOptions
): Result<string, EMAIL_ERROR> {
    if (opts?.optional && value === undefined) {
        return Result.success(value);
    }

    if (typeof value !== "string") {
        return Result.fail(ParsingError.SHOULD_BE_EMAIL);
    }

    if (!value.includes("@")) {
        return Result.fail(ParsingError.SHOULD_BE_EMAIL);
    }

    return Result.success(value);
}

export function parseNumber(
    value: any,
    opts?: ParsingOptions
): Result<number, NUMBER_ERROR> {
    if (opts?.optional && value === undefined) {
        return Result.success(value);
    }

    let parsed = Number(value);

    if (isNaN(parsed)) {
        return Result.fail(ParsingError.SHOULD_BE_NUMBER);
    }

    return Result.success(parsed);
}

export function parseArray<T>(
    value: any,
    parser: (value: any) => Result<T, string>,
    opts?: ParsingOptions & {
        min?: number;
        max?: number;
    }
): Result<T[], ARRAY_ERROR> {
    if (opts?.optional && value === undefined) {
        return Result.success(value);
    }

    if (!Array.isArray(value)) {
        return Result.fail(ParsingError.SHOULD_BE_ARRAY);
    }

    if (opts?.min && value.length < opts.min) {
        return Result.fail(ParsingError.ARRAY_LESS_THAN_MIN);
    }

    if (opts?.max && value.length > opts.max) {
        return Result.fail(ParsingError.ARRAY_GREATER_THAN_MAX);
    }

    const parsed: T[] = [];
    for (const item of value) {
        const result = parser(item);
        if (Result.isFailure(result)) {
            return Result.fail(ParsingError.ARRAY_INVALID_TYPE);
        }

        parsed.push(result.value);
    }

    return Result.success(parsed);
}
