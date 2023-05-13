import { Product } from "../../entities/product-entity";

export interface IProductsStore {
    create(product: Product): Promise<void>;
}
