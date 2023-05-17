import { IProductsStore } from "../../providers/products-store.js";
import { PRODUCT_EVENTS, ProductEvent } from "./product-events.js";

export type ProductPublishedEvent = ProductEvent<
    typeof PRODUCT_EVENTS.PRODUCT_PUBLISHED,
    {}
>;

export interface ProductPublishedContext {
    products: IProductsStore;
}

export async function ApplyProductPublishedEvent(
    event: ProductPublishedEvent,
    context: ProductPublishedContext
): Promise<void> {
    await context.products.update(event.productId, {
        published: true,
    });
}
