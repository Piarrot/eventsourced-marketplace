import { Product } from "../entities/product";

export interface IProductsProvider {
    getProductsByOwner(ownerId: string): Promise<Product[]>;
}
