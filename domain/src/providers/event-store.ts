import { Event } from "../utils/event";

export interface IEventStore {
    publish<T extends Event<string, any>>(event: T): Promise<void>;
}
