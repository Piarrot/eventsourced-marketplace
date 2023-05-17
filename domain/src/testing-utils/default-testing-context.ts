import { CryptoProviderMock } from "./mocks/crypto-provider.mock.js";
import { EventStoreMock } from "./mocks/event-store.mock.js";
import { ProductProviderMock } from "./mocks/product-provider.mock.js";
import { TimeProviderMock } from "./mocks/time-provider.mock.js";
import { UserProviderMock } from "./mocks/users-provider.mock.js";

interface DefaultTestingContext {
    time: TimeProviderMock;
    crypto: CryptoProviderMock;
    products: ProductProviderMock;
    users: UserProviderMock;
    events: EventStoreMock;
}

export const createTestingContext = (): DefaultTestingContext => ({
    time: new TimeProviderMock(),
    crypto: new CryptoProviderMock(),
    products: new ProductProviderMock(),
    users: new UserProviderMock(),
    events: new EventStoreMock(),
});
