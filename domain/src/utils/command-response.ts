export interface CommandSuccess {
    success: true;
}

export interface CommandFailure<E extends string> {
    success: false;
    error: E;
}

export type CommandResponse<E extends string> =
    | CommandSuccess
    | CommandFailure<E>;

export const CommandResponse = {
    success(): CommandSuccess {
        return {
            success: true,
        };
    },
    failure<E extends string>(error: E): CommandFailure<E> {
        return {
            success: false,
            error,
        };
    },
    isSuccess<E extends string>(
        response: CommandResponse<E>
    ): response is CommandSuccess {
        return response.success;
    },
    isFailure<E extends string>(
        response: CommandResponse<E>
    ): response is CommandFailure<E> {
        return !response.success;
    },
} as const;
