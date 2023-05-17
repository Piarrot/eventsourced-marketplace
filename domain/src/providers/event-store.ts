import { Event } from "../utils/event.js";

export interface IEventStore {
    publish<T extends Event<string, any>>(event: T): Promise<void>;
    subscribe<T extends Event<string, any>>(
        eventType: string,
        handler: (event: T) => Promise<void> | void
    ): void;
}
