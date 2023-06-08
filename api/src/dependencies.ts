import { ConsoleLogger } from "./providers/impl/logger.js";
import { MemoryEventStore } from "./providers/impl/memory-event-store.js";
import { CryptoProvider } from "./providers/impl/crypto-provider.js";
import { TimeProvider } from "./providers/impl/time-provider.js";
import { UsersProvider } from "./providers/impl/users-provider.js";
import { ProductsProvider } from "./providers/impl/products-provider.js";
import { dependencyContainer } from "./container.js";

const productionDependencies = {
    logger: new ConsoleLogger(),
    products: new ProductsProvider(),
    users: new UsersProvider(),
    events: new MemoryEventStore(),
    crypto: new CryptoProvider(
        process.env.JWT_SECRET ?? "los gatitos son lo mejor"
    ),
    time: new TimeProvider(),
} as const;

export function registerDependencies() {
    Object.keys(productionDependencies).forEach((key) => {
        const dependencyKey = key as keyof typeof productionDependencies;
        (dependencyContainer[dependencyKey] as any) =
            productionDependencies[dependencyKey];
    });
}
