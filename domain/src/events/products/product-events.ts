import { Event } from "../../utils/event.js";

export const PRODUCT_EVENTS = {
    PRODUCT_CREATED: "PRODUCT_CREATED",
    PRODUCT_UPDATED: "PRODUCT_UPDATED",
    PRODUCT_DELETED: "PRODUCT_DELETED",
    PRODUCT_PUBLISHED: "PRODUCT_PUBLISHED",
    PRODUCT_UNPUBLISHED: "PRODUCT_UNPUBLISHED",
} as const;
export type PRODUCT_EVENTS =
    (typeof PRODUCT_EVENTS)[keyof typeof PRODUCT_EVENTS];

export type PRODUCT_CREATED_EVENT = typeof PRODUCT_EVENTS.PRODUCT_CREATED;
export type PRODUCT_UPDATED_EVENT = typeof PRODUCT_EVENTS.PRODUCT_UPDATED;
export type PRODUCT_DELETED_EVENT = typeof PRODUCT_EVENTS.PRODUCT_DELETED;
export type PRODUCT_PUBLISHED_EVENT = typeof PRODUCT_EVENTS.PRODUCT_PUBLISHED;
export type PRODUCT_UNPUBLISHED_EVENT =
    typeof PRODUCT_EVENTS.PRODUCT_UNPUBLISHED;

export type ProductEvent<K extends PRODUCT_EVENTS, P> = Event<K, P> & {
    productId: string;
};
