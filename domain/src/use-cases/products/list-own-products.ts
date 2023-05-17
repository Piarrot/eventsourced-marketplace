import {
    ProductListResponseModel,
    productListTransformer,
} from "../../index.js";
import { User } from "../../entities/user.js";
import { IProductsProvider } from "../../providers/products-provider.js";
import { QueryResponse } from "../../utils/query-response.js";

export interface ListOwnProductsContext {
    products: IProductsProvider;
    currentUser: User;
}

export async function ListOwnProductsUseCase(
    payload: {},
    context: ListOwnProductsContext
): Promise<QueryResponse<ProductListResponseModel[], never>> {
    return QueryResponse.success(
        productListTransformer(
            await context.products.getProductsByOwner(context.currentUser.id)
        )
    );
}
