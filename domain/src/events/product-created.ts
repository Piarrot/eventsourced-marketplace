import { IProductsStore } from "../providers/aggregate-stores/products-store";
import { Event } from "../utils/event";

export const ProductCreatedEventType = "product-created";
export type ProductCreatedEventType = typeof ProductCreatedEventType;

export type ProductCreatedEvent = Event<
    ProductCreatedEventType,
    {
        id: string;
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
    const { id, name, price, discount, description, images, categoryIds } =
        event.payload;

    await products.create({
        id,
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
