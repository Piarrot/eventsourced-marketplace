import { Product } from "../../entities/product-entity";
import { User } from "../../entities/user-entity";
import { ERRORS, PERMISSION_DENIED_ERROR } from "../../errors/errors";
import { EVENTS } from "../../events";
import { ProductUpdatedEvent } from "../../events/products/product-updated";
import { IEventStore } from "../../providers/event-store";
import { ITimeProvider } from "../../providers/time-provider";
import { Result } from "../../utils/result";

export interface UpdateProductContext {
    time: ITimeProvider;
    eventStore: IEventStore;
    currentUser: User;
}

export interface UpdateProductPayload {
    name?: string;
    price?: number;
    discount?: number;
    description?: string;
    images?: string[];
    categoryIds?: string[];
}

export interface UpdateProductResponse {
    success: true;
}

export async function UpdateProductUseCase(
    product: Product,
    payload: UpdateProductPayload,
    context: UpdateProductContext
): Promise<Result<UpdateProductResponse, PERMISSION_DENIED_ERROR>> {
    if (product.ownerId !== context.currentUser.id) {
        return Result.fail(ERRORS.PERMISSION_DENIED);
    }

    await context.eventStore.publish<ProductUpdatedEvent>({
        type: EVENTS.PRODUCT_UPDATED,
        userId: context.currentUser.id,
        productId: product.id,
        timestamp: context.time.currentTimestamp(),
        payload,
    });

    return Result.ok({
        success: true,
    });
}
