import { IProductsStore } from "../../providers/products-store";
import { PRODUCT_UPDATED_EVENT, ProductEvent } from "./product-events";

export type ProductUpdatedEvent = ProductEvent<
    PRODUCT_UPDATED_EVENT,
    {
        name?: string;
        price?: number;
        discount?: number;
        description?: string;
        images?: string[];
        categoryIds?: string[];
    }
>;

export interface ProductUpdatedContext {
    products: IProductsStore;
}

export async function ApplyProductUpdated(
    event: ProductUpdatedEvent,
    context: ProductUpdatedContext
): Promise<void> {
    const { products } = context;

    await products.update(event.productId, {
        ...event.payload,
        lastUpdate: event.timestamp,
    });
}
