import { User } from "../../entities/user.js";
import { ProductCreatedEvent } from "../../events/products/product-created.js";
import { PRODUCT_EVENTS } from "../../events/products/product-events.js";
import { ICryptoProvider } from "../../providers/crypto-provider.js";
import { IEventStore } from "../../providers/event-store.js";
import { ITimeProvider } from "../../providers/time-provider.js";
import { CreateProductPayload } from "../../request-models/create-product-payload.js";
import { CommandResponse } from "../../utils/command-response.js";

export interface CreateProductContext {
    currentUser: User;
    events: IEventStore;
    crypto: ICryptoProvider;
    time: ITimeProvider;
}

export async function CreateProductUseCase(
    payload: CreateProductPayload,
    context: CreateProductContext
): Promise<CommandResponse<never>> {
    const { currentUser, events, crypto, time } = context;
    const { name, price, discount, description, images, categoryIds } = payload;

    const event: ProductCreatedEvent = {
        type: PRODUCT_EVENTS.PRODUCT_CREATED,
        userId: currentUser.id,
        timestamp: time.currentTimestamp(),
        productId: await crypto.newUUID(),
        payload: {
            name,
            price,
            discount,
            description,
            images,
            categoryIds,
        },
    };

    await events.publish(event);

    return CommandResponse.success();
}
