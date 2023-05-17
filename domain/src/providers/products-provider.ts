import { Product } from "../entities/product.js";

export interface IProductsProvider {
    getProductsByOwner(ownerId: string): Promise<Product[]>;
    getById(id: string): Promise<Product | undefined>;
}
