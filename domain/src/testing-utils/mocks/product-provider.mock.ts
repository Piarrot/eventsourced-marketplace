import { Product } from "../../entities/product";
import { IProductsProvider } from "../../providers/products-provider";
import { IProductsStore } from "../../providers/products-store";
import { deepClone } from "../../utils/cloning";

export class ProductProviderMock implements IProductsProvider, IProductsStore {
    async getProductsByOwner(ownerId: string) {
        return deepClone(this.products.filter((p) => p.ownerId === ownerId));
    }
    async getById(id: string) {
        return deepClone(this.products.find((p) => p.id === id));
    }

    async create(product: Product): Promise<void> {
        this.products.push(deepClone(product));
    }
    async update(
        productId: string,
        productMutation: Partial<Omit<Product, "id">>
    ): Promise<void> {
        const product = this.products.find((p) => p.id === productId);
        Object.assign(product!, productMutation);
    }

    /// Mocking utilities
    private products: Product[] = [];

    addProducts(products: Product[]) {
        this.products.push(...deepClone(products));
    }
}
