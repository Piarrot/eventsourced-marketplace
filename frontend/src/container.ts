import { Container } from "@ulthar/deppy";
import { IEndpointFetcher } from "./providers/endpoint-fetcher.ts";

export type DependencyMap = {
    endpointFetcher: IEndpointFetcher;
};

export const container = new Container<DependencyMap>();
