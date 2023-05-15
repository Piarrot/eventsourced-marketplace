import { IProductsStore } from "../../providers/aggregate-stores/products-store";
import { PRODUCT_CREATED_EVENT, ProductEvent } from "./product-events";

export type ProductCreatedEvent = ProductEvent<
    PRODUCT_CREATED_EVENT,
    {
        name: string;
        price: number;
        discount: number;
        description: string;
        images: string[];
        categoryIds: string[];
    }
>;

export interface ProductCreatedContext {
    products: IProductsStore;
}

export async function ApplyProductCreated(
    event: ProductCreatedEvent,
    context: ProductCreatedContext
): Promise<void> {
    const { products } = context;
    const { name, price, discount, description, images, categoryIds } =
        event.payload;

    await products.create({
        id: event.productId,
        name,
        price,
        discount,
        description,
        images,
        categoryIds,
        createdAt: event.timestamp,
        published: false,
        ownerId: event.userId,
    });
}
