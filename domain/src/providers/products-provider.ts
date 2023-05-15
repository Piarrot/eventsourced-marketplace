import { Product } from "../entities/product-entity";

export interface IProductsProvider {
    getProductsByOwner(ownerId: string): Promise<Product[]>;
}
