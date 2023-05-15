import { Product } from "../../entities/product-entity";
import { User } from "../../entities/user-entity";
import { IProductsProvider } from "../../providers/products-provider";

export interface ListOwnProductsContext {
    products: IProductsProvider;
    currentUser: User;
}

export function ListOwnProducts(
    context: ListOwnProductsContext
): Promise<Product[]> {
    return context.products.getProductsByOwner(context.currentUser.id);
}
