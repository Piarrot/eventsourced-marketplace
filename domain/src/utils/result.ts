export type Result<T, E> = ResultValue<T> | ResultError<E>;

export interface ResultError<E> {
    error: E;
}

export interface ResultValue<T> {
    value: T;
}

export const Result = {
    fail<E>(error: E): ResultError<E> {
        return { error };
    },
    success<T>(value: T): ResultValue<T> {
        return { value };
    },
    isFailure<T, E>(result: Result<T, E>): result is ResultError<E> {
        return (<any>result).error !== undefined;
    },
    isSuccess<T, E>(result: Result<T, E>): result is ResultValue<T> {
        return (<any>result).error === undefined;
    },
    unwrap<T>(result: ResultValue<T>): T {
        return result.value;
    },
    unwrapError<E>(result: ResultError<E>): E {
        return result.error;
    },
};
