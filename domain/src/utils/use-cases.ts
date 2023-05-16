import { CommandResponse } from "./command-response";
import { QueryResponse } from "./query-response";

export type CommandUseCase<Payload, Context, Error extends string> = (
    payload: Payload,
    context: Context
) => Promise<CommandResponse<Error>>;

export type QueryUseCase<Payload, Context, Result, Error extends string> = (
    payload: Payload,
    context: Context
) => Promise<QueryResponse<Result, Error>>;