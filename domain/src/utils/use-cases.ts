import { CommandResponse } from "./command-response.js";
import { QueryResponse } from "./query-response.js";

export type CommandUseCase<Payload, Context, Error extends string> = (
    payload: Payload,
    context: Context
) => Promise<CommandResponse<Error>>;

export type QueryUseCase<Payload, Context, Result, Error extends string> = (
    payload: Payload,
    context: Context
) => Promise<QueryResponse<Result, Error>>;

export type DomainUseCase<Payload, Context, Result, Error extends string> =
    | CommandUseCase<Payload, Context, Error>
    | QueryUseCase<Payload, Context, Result, Error>;
