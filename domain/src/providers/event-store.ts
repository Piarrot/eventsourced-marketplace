import { Event } from "../utils/events";

export interface EventStore {
    saveEvent(event: Event<string, any>): Promise<void>;
    getEventStream(eventType: string): Promise<Event<string, any>[]>;
}
