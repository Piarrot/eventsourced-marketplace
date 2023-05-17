import { CommandResponse, QueryResponse } from ".";

export type DomainResponse<T, E extends string> =
    | CommandResponse<E>
    | QueryResponse<T, E>;
