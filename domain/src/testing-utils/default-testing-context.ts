import { CryptoProviderMock } from "./mocks/crypto-provider.mock";
import { ProductProviderMock } from "./mocks/product-provider.mock";
import { TimeProviderMock } from "./mocks/time-provider.mock";
import { UserProviderMock } from "./mocks/users-provider.mock";

interface DefaultTestingContext {
    time: TimeProviderMock;
    crypto: CryptoProviderMock;
    products: ProductProviderMock;
    users: UserProviderMock;
}

export const getDefaultContext = (): DefaultTestingContext => ({
    time: new TimeProviderMock(),
    crypto: new CryptoProviderMock(),
    products: new ProductProviderMock(),
    users: new UserProviderMock(),
});
