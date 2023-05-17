import { FailureResponse } from "./failure-response.js";

export interface CommandSuccess {
    success: true;
}

export type CommandResponse<E extends string> =
    | CommandSuccess
    | FailureResponse<E>;

export const CommandResponse = {
    success(): CommandSuccess {
        return {
            success: true,
        };
    },
    failure<E extends string>(error: E): FailureResponse<E> {
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
    ): response is FailureResponse<E> {
        return !response.success;
    },
} as const;
