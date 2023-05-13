import { Product } from "../../entities/product-entity";
import { IProductProvider } from "../../providers/aggregate-stores/product-provider";
import { IProductsStore } from "../../providers/aggregate-stores/products-store";

export class ProductProviderMock implements IProductProvider, IProductsStore {
    getProductsByOwner(ownerId: string) {
        return Promise.resolve(
            this.products.filter((p) => p.ownerId === ownerId)
        );
    }

    async create(product: Product): Promise<void> {
        this.products.push(product);
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
