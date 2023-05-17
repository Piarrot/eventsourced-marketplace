import { Event, IEventStore } from "marketplace-domain";
import { MaybePromise } from "@ulthar/typey";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const __dirname = new URL(".", import.meta.url).pathname;
const filePath = join(__dirname, "../../../data/events.json");

export class MemoryEventStore implements IEventStore {
    private events: Event<string, any>[] = [];
    private eventSubscribers: Record<
        string,
        Array<(event: Event<string, any>) => MaybePromise<void>>
    > = {};
    private stateRebuilt = false;

    constructor() {
        process.on("exit", () => {
            this.saveEvents();
        });
    }

    publish<T extends Event<string, any>>(event: T): Promise<void> {
        this.events.push(event);
        this.notifySubscribers(event);
        this.saveEvents();
        return Promise.resolve();
    }

    subscribe<T extends Event<string, any>>(
        eventName: string,
        handler: (event: T) => MaybePromise<void>
    ): void {
        if (!this.eventSubscribers[eventName]) {
            this.eventSubscribers[eventName] = [];
        }
        this.eventSubscribers[eventName].push(handler as any);
    }

    private async notifySubscribers<T extends Event<string, any>>(event: T) {
        const subscribers = this.eventSubscribers[event.type] || [];
        for (const subscriber of subscribers) {
            await subscriber(event);
        }
    }

    public async rebuildState() {
        if (this.stateRebuilt) return;
        let events = [];
        if (existsSync(filePath)) {
            events = JSON.parse(await readFile(filePath, "utf-8"));
            await Promise.all(
                events.map((event: Event<string, any>) => {
                    return this.notifySubscribers(event);
                })
            );
        }
        this.events = events;
        this.stateRebuilt = true;
    }

    private async saveEvents() {
        await writeFile(filePath, JSON.stringify(this.events));
    }
}
