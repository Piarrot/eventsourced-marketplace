import { User } from "../../entities/user-entity";
import { ProductCreatedEvent } from "../../events/product-created";
import { ICryptoProvider } from "../../providers/crypto-provider";
import { IEventStore } from "../../providers/event-store";
import { ITimeProvider } from "../../providers/time-provider";

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

export interface CreateProductResponseModel {
    productId: string;
}

export async function CreateProduct(
    payload: CreateProductPayload,
    context: CreateProductContext
): Promise<CreateProductResponseModel> {
    const { currentUser, eventStore, crypto, time } = context;
    const { name, price, discount, description, images, categoryIds } = payload;

    const event: ProductCreatedEvent = {
        type: "product-created",
        userId: currentUser.id,
        timestamp: time.currentTimestamp(),
        payload: {
            id: await crypto.newUUID(),
            name,
            price,
            discount,
            description,
            images,
            categoryIds,
        },
    };

    await eventStore.publish(event);

    return {
        productId: event.payload.id,
    };
}
