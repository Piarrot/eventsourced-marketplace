import { IEventStore } from "../../providers/event-store";
import { Event } from "../../utils/event";

export class EventStoreMock implements IEventStore {
    async publish<K extends string, P>(event: Event<K, P>) {
        if (!this.events.has(event.type)) {
            this.events.set(event.type, []);
        }
        this.events.get(event.type)!.push(event);
    }
    /// Mocking utilities
    events = new Map<string, Event<string, any>[]>();
    getEventStream(type: string) {
        return this.events.get(type) ?? [];
    }
}
