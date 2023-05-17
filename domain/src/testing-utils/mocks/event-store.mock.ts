import { IEventStore } from "../../providers/event-store.js";
import { deepClone } from "../../utils/cloning/index.js";
import { Event } from "../../utils/event.js";

export class EventStoreMock implements IEventStore {
    rebuildState(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    subscribe<T extends Event<string, any>>(
        eventType: string,
        handler: (event: T) => Promise<void>
    ): void {
        throw new Error("Method not implemented.");
    }
    async publish<K extends string, P>(event: Event<K, P>) {
        if (!this.events.has(event.type)) {
            this.events.set(event.type, []);
        }
        this.events.get(event.type)!.push(deepClone(event));
    }
    /// Mocking utilities
    events = new Map<string, Event<string, any>[]>();
    getEventStream(type: string) {
        return this.events.get(type) ?? [];
    }
}
