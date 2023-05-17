import { ProductListResponseModel, productListTransformer } from "../..";
import { User } from "../../entities/user";
import { IProductsProvider } from "../../providers/products-provider";
import { QueryResponse } from "../../utils/query-response";

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
