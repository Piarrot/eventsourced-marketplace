import { Product } from "../entities/product";

export interface IProductsStore {
    create(product: Product): Promise<void>;
    update(
        productId: string,
        productMutation: Partial<Omit<Product, "id">>
    ): unknown;
}
