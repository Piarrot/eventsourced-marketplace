import { ApplyProductCreated } from "./products/product-created.js";
import { PRODUCT_EVENTS } from "./products/product-events.js";
import { ApplyProductPublishedEvent } from "./products/product-published.js";
import { ApplyProductUpdated } from "./products/product-updated.js";
import { ApplyUserRegistered } from "./users/user-registered.js";
import { USER_EVENTS } from "./users/user-events.js";

export const EVENTS = {
    // USER
    ...USER_EVENTS,

    // PRODUCT
    ...PRODUCT_EVENTS,

    // ORDER
    ORDER_CREATED: "ORDER_CREATED",
    ORDER_UPDATED: "ORDER_UPDATED",
    ORDER_CANCELLED: "ORDER_CANCELLED",
    ORDER_PAYMENT_COMPLETED: "ORDER_PAYMENT_COMPLETED",
    ORDER_PAYMENT_FAILED: "ORDER_PAYMENT_FAILED",
    ORDER_SHIPMENT_CREATED: "ORDER_SHIPMENT_CREATED",
    ORDER_SHIPMENT_UPDATED: "ORDER_SHIPMENT_UPDATED",
    ORDER_COMPLETED: "ORDER_COMPLETED",
} as const;

export type EVENTS = (typeof EVENTS)[keyof typeof EVENTS];

export const EventApplyMap: Record<
    EVENTS,
    ((e: any, c: any) => Promise<void>) | undefined
> = {
    //USERS
    USER_CREATED: ApplyUserRegistered,
    USER_LOGGED_IN: undefined,

    //ORDERS
    ORDER_CREATED: undefined,
    ORDER_UPDATED: undefined,
    ORDER_CANCELLED: undefined,
    ORDER_PAYMENT_COMPLETED: undefined,
    ORDER_PAYMENT_FAILED: undefined,
    ORDER_SHIPMENT_CREATED: undefined,
    ORDER_SHIPMENT_UPDATED: undefined,
    ORDER_COMPLETED: undefined,

    //PRODUCTS
    PRODUCT_CREATED: ApplyProductCreated,
    PRODUCT_UPDATED: ApplyProductUpdated,
    PRODUCT_DELETED: undefined,
    PRODUCT_PUBLISHED: ApplyProductPublishedEvent,
    PRODUCT_UNPUBLISHED: undefined,
};

export * from "./users/index.js";
export * from "./products/index.js";
