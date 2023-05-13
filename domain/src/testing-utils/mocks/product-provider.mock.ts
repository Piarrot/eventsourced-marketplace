import { Product } from "../../entities/product-entity";
import { IProductProvider } from "../../providers/aggregate-stores/product-provider";

export class ProductProviderMock implements IProductProvider {
    getProductsByOwner(ownerId: string) {
        return Promise.resolve(
            this.products.filter((p) => p.ownerId === ownerId)
        );
    }

    /// Mocking utilities
    private products: Product[] = [];

    addProducts(product: Product[]) {
        this.products.push(...product);
    }
    clear() {
        this.products = [];
    }
}
