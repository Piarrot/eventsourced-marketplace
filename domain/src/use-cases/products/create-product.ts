import { User } from "../../entities/user";
import { ProductCreatedEvent } from "../../events/products/product-created";
import { PRODUCT_EVENTS } from "../../events/products/product-events";
import { ICryptoProvider } from "../../providers/crypto-provider";
import { IEventStore } from "../../providers/event-store";
import { ITimeProvider } from "../../providers/time-provider";
import { CommandResponse } from "../../utils/command-response";

export interface CreateProductPayload {
    name: string;
    price: number;
    discount: number;
    description: string;
    images: string[];
    categoryIds: string[];
}

export interface CreateProductContext {
    currentUser: User;
    eventStore: IEventStore;
    crypto: ICryptoProvider;
    time: ITimeProvider;
}

export async function CreateProduct(
    payload: CreateProductPayload,
    context: CreateProductContext
): Promise<CommandResponse<never>> {
    const { currentUser, eventStore, crypto, time } = context;
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

    await eventStore.publish(event);

    return CommandResponse.success();
}
