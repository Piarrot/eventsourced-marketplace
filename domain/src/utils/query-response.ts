import { FailureResponse } from "./failure-response.js";

export interface QuerySuccess<T> {
    success: true;
    data: T;
}

export type QueryResponse<T, E extends string> =
    | QuerySuccess<T>
    | FailureResponse<E>;

export const QueryResponse = {
    success<T>(data: T): QuerySuccess<T> {
        return {
            success: true,
            data,
        };
    },
    failure<E extends string>(error: E): FailureResponse<E> {
        return {
            success: false,
            error,
        };
    },
    isSuccess<T, E extends string>(
        response: QueryResponse<T, E>
    ): response is QuerySuccess<T> {
        return response.success;
    },
    isFailure<T, E extends string>(
        response: QueryResponse<T, E>
    ): response is FailureResponse<E> {
        return !response.success;
    },
} as const;
