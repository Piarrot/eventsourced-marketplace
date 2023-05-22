import { IProductsProvider } from "../../providers/products-provider.js";
import { QueryResponse } from "../../utils/query-response.js";

export async function ListOffersUseCase(
    payload: {},
    context: { products: IProductsProvider }
) {
    const products = (await context.products.getAll())
        .filter((p) => p.discount > 0)
        .sort((a, b) => b.discount - a.discount);

    return QueryResponse.success(products);
}
