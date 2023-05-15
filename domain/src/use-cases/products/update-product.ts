import { User } from "../../entities/user";
import {
    ERRORS,
    INVALID_PRODUCT_ERROR,
    PERMISSION_DENIED_ERROR,
} from "../../errors/errors";
import { EVENTS } from "../../events";
import { ProductUpdatedEvent } from "../../events/products/product-updated";
import { IEventStore } from "../../providers/event-store";
import { IProductsProvider } from "../../providers/products-provider";
import { ITimeProvider } from "../../providers/time-provider";
import { CommandResponse } from "../../utils/command-response";

export interface UpdateProductContext {
    time: ITimeProvider;
    eventStore: IEventStore;
    currentUser: User;
    products: IProductsProvider;
}

export interface UpdateProductPayload {
    id: string;
    name?: string;
    price?: number;
    discount?: number;
    description?: string;
    images?: string[];
    categoryIds?: string[];
}

export async function UpdateProductUseCase(
    payload: UpdateProductPayload,
    context: UpdateProductContext
): Promise<CommandResponse<PERMISSION_DENIED_ERROR | INVALID_PRODUCT_ERROR>> {
    const product = await context.products.getById(payload.id);
    if (!product) {
        return CommandResponse.failure(ERRORS.INVALID_PRODUCT);
    }
    if (product.ownerId !== context.currentUser.id) {
        return CommandResponse.failure(ERRORS.PERMISSION_DENIED);
    }

    await context.eventStore.publish<ProductUpdatedEvent>({
        type: EVENTS.PRODUCT_UPDATED,
        userId: context.currentUser.id,
        productId: product.id,
        timestamp: context.time.currentTimestamp(),
        payload: {
            name: payload.name,
            price: payload.price,
            discount: payload.discount,
            description: payload.description,
            images: payload.images,
            categoryIds: payload.categoryIds,
        },
    });

    return CommandResponse.success();
}
