import { User } from "../../entities/user.js";
import {
    DOMAIN_ERRORS,
    INVALID_PRODUCT_ERROR,
    PERMISSION_DENIED_ERROR,
} from "../../errors/index.js";
import { EVENTS } from "../../events/index.js";
import { ProductUpdatedEvent } from "../../events/products/product-updated.js";
import { IEventStore } from "../../providers/event-store.js";
import { IProductsProvider } from "../../providers/products-provider.js";
import { ITimeProvider } from "../../providers/time-provider.js";
import { UpdateProductPayload } from "../../request-models/update-product-payload.js";
import { CommandResponse } from "../../utils/command-response.js";

export interface UpdateProductContext {
    time: ITimeProvider;
    events: IEventStore;
    currentUser: User;
    products: IProductsProvider;
}

export async function UpdateProductUseCase(
    payload: UpdateProductPayload,
    context: UpdateProductContext
): Promise<CommandResponse<PERMISSION_DENIED_ERROR | INVALID_PRODUCT_ERROR>> {
    const product = await context.products.getById(payload.id);
    if (!product) {
        return CommandResponse.failure(DOMAIN_ERRORS.INVALID_PRODUCT);
    }
    if (product.ownerId !== context.currentUser.id) {
        return CommandResponse.failure(DOMAIN_ERRORS.PERMISSION_DENIED);
    }

    await context.events.publish<ProductUpdatedEvent>({
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
