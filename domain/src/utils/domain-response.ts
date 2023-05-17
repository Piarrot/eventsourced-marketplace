import { CommandResponse, QueryResponse } from "./index.js";

export type DomainResponse<T, E extends string> =
    | CommandResponse<E>
    | QueryResponse<T, E>;
