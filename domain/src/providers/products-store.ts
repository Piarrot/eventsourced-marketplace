import { Product } from "../entities/product.js";

export interface IProductsStore {
    create(product: Product): Promise<void>;
    update(
        productId: string,
        productMutation: Partial<Omit<Product, "id">>
    ): Promise<void>;
}
