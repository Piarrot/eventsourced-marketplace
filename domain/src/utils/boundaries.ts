import { Result } from "./result";
import { CommandUseCase, QueryUseCase } from "./use-cases";

export type RequestParser<T, E extends string> = (payload: any) => Result<T, E>;

export type RequestTransformer<T, R> = (value: T) => R;

export interface CommandBoundaryHandler<
    Payload,
    Context,
    DomainError extends string
> {
    requestParser?: RequestParser<Payload, string>;
    handler: CommandUseCase<Payload, Context, DomainError>;
}

export interface QueryBoundaryHandler<
    Payload,
    Context,
    HandlerResult,
    QueryResponse,
    DomainError extends string
> {
    requestParser?: RequestParser<Payload, string>;
    handler: QueryUseCase<Payload, Context, HandlerResult, DomainError>;
    responseTransformer?: RequestTransformer<HandlerResult, QueryResponse>;
}
