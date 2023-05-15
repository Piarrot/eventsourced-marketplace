import { Product } from "../../entities/product";
import { User } from "../../entities/user";
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
