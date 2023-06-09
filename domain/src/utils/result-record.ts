import { Result } from "./result.js";

export type SuccessRecord<T> = {
    success: true;
    values: T;
};

export type FailureRecord<T, E extends string> = {
    success: false;
    errors: {
        [K in keyof T]?: E;
    };
    values: {
        [K in keyof T]?: T[K];
    };
};

export type ResultRecord<T, E extends string> =
    | SuccessRecord<T>
    | FailureRecord<T, E>;

export const ResultRecord = {
    success<T>(values: T): SuccessRecord<T> {
        return {
            success: true,
            values,
        };
    },

    failure<T, E extends string>(
        errors: {
            [K in keyof T]?: E;
        },
        values: {
            [K in keyof T]?: T[K];
        }
    ): FailureRecord<T, E> {
        return {
            success: false,
            errors,
            values,
        };
    },

    unwrap<T, E extends string>(record: {
        [K in keyof T]: Result<T[K], E>;
    }): ResultRecord<T, E> {
        const errors: {
            [K in keyof T]?: E;
        } = {};
        const values: {
            [K in keyof T]?: T[K];
        } = {};
        for (const key in record) {
            const result = record[key];
            if (Result.isSuccess(result)) {
                values[key] = result.value;
            } else {
                errors[key] = result.error;
            }
        }

        if (Object.keys(errors).length > 0) {
            return ResultRecord.failure(errors, values);
        }

        return ResultRecord.success(values as T);
    },

    isFailure<T, E extends string>(
        record: ResultRecord<T, E>
    ): record is FailureRecord<T, E> {
        return !record.success;
    },

    isSuccess<T, E extends string>(
        record: ResultRecord<T, E>
    ): record is SuccessRecord<T> {
        return record.success;
    },
} as const;
