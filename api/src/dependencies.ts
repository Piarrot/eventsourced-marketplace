import { DependencyMapResolvers } from "@ulthar/deppy";
import { Dependencies } from "./container.js";
import { MaybePromise } from "@ulthar/typey";
import {
    IProductsProvider,
    IProductsStore,
    IUsersProvider,
    IEventStore,
    ICryptoProvider,
    ITimeProvider,
    IUsersStore,
} from "mercadoliebre-domain";
import { ILogger } from "./providers/logger.js";
import { ConsoleLogger } from "./providers/impl/logger.js";
import { MemoryEventStore } from "./providers/impl/memory-event-store.js";
import { CryptoProvider } from "./providers/impl/crypto-provider.js";
import { TimeProvider } from "./providers/impl/time-provider.js";
import { UsersProvider } from "./providers/impl/users-provider.js";
import { ProductsProvider } from "./providers/impl/products-provider.js";

export const dependencies: DependencyMapResolvers<Dependencies> = {
    logger: function (): MaybePromise<ILogger> {
        return new ConsoleLogger();
    },
    products: function (): MaybePromise<IProductsProvider & IProductsStore> {
        return new ProductsProvider();
    },
    users: function (): MaybePromise<IUsersProvider & IUsersStore> {
        return new UsersProvider();
    },
    events: function (): MaybePromise<IEventStore> {
        return new MemoryEventStore();
    },
    crypto: function (): MaybePromise<ICryptoProvider> {
        return new CryptoProvider(
            process.env.JWT_SECRET ?? "los gatitos son lo mejor"
        );
    },
    time: function (): MaybePromise<ITimeProvider> {
        return new TimeProvider();
    },
};
