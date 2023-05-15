export type Result<T, E> = Value<T> | Error<E>;

export interface Error<E> {
    error: E;
}

export interface Value<T> {
    value: T;
}

export const Result = {
    fail<E>(error: E): Error<E> {
        return { error };
    },
    ok<T>(value: T): Value<T> {
        return { value };
    },
    isError<T, E>(result: Result<T, E>): result is Error<E> {
        return (<any>result).error !== undefined;
    },
    isSuccess<T, E>(result: Result<T, E>): result is Value<T> {
        return (<any>result).value !== undefined;
    },
    unwrap<T>(result: Value<T>): T {
        return result.value;
    },
    unwrapError<E>(result: Error<E>): E {
        return result.error;
    },
};
