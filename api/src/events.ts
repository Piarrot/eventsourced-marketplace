import { EVENTS, EventApplyMap } from "marketplace-domain";
import { Dependencies, container } from "./container.js";

export function subscribeEventAppliers() {
    const context = container.getPlainDependencyMap();
    for (const eventType in EventApplyMap) {
        const element = EventApplyMap[eventType as EVENTS];
        if (element) {
            context.events.subscribe(eventType, async (evt) => {
                await element(evt, context);
            });
        }
    }
}
