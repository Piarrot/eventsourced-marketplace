import { Product } from "../../entities/product-entity";

export interface IProductProvider {
    getProductsByOwner(ownerId: string): Promise<Product[]>;
}
