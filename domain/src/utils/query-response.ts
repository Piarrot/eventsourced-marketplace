export interface QuerySuccess<T> {
    success: true;
    data: T;
}

export interface QueryFailure<E extends string> {
    success: false;
    error: E;
}

export type QueryResponse<T, E extends string> =
    | QuerySuccess<T>
    | QueryFailure<E>;

export const QueryResponse = {
    success<T>(data: T): QuerySuccess<T> {
        return {
            success: true,
            data,
        };
    },
    failure<E extends string>(error: E): QueryFailure<E> {
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
    ): response is QueryFailure<E> {
        return !response.success;
    },
} as const;
