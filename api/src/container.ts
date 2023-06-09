import { ILogger } from "./providers/logger.js";
import {
    ICryptoProvider,
    IEventStore,
    IProductsProvider,
    IProductsStore,
    ITimeProvider,
    IUsersProvider,
    IUsersStore,
} from "marketplace-domain";

export type Dependencies = {
    logger: ILogger;
    products: IProductsProvider & IProductsStore;
    users: IUsersProvider & IUsersStore;
    events: IEventStore;
    crypto: ICryptoProvider;
    time: ITimeProvider;
};

export const dependencyContainer = {} as Dependencies;
