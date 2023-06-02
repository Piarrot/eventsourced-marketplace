import { Container } from "@ulthar/deppy";
import { IEndpointFetcher } from "./providers/endpoint-fetcher.ts";
import { IAuthServiceProvider } from "./providers/auth-service.ts";

export type DependencyMap = {
    endpointFetcher: IEndpointFetcher;
    authServiceProvider: IAuthServiceProvider;
};

export const container = new Container<DependencyMap>();
