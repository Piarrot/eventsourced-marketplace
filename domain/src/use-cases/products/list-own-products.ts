import { Product } from "../../entities/product";
import { User } from "../../entities/user";
import { IProductsProvider } from "../../providers/products-provider";
import { QueryResponse } from "../../utils/query-response";

export interface ListOwnProductsContext {
    products: IProductsProvider;
    currentUser: User;
}

export async function ListOwnProducts(
    context: ListOwnProductsContext
): Promise<QueryResponse<Product[], never>> {
    return QueryResponse.success(
        await context.products.getProductsByOwner(context.currentUser.id)
    );
}
