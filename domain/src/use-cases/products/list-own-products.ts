import { Product } from "../../entities/product-entity";
import { User } from "../../entities/user-entity";
import { IProductProvider } from "../../providers/aggregate-stores/product-provider";

export interface ListOwnProductsContext {
    products: IProductProvider;
    currentUser: User;
}

export function ListOwnProducts(
    context: ListOwnProductsContext
): Promise<Product[]> {
    return context.products.getProductsByOwner(context.currentUser.id);
}
