import { EVENTS, EventApplyMap } from "marketplace-domain";
import { container } from "./container.js";

export function subscribeEventAppliers() {
    const context = container.getPlainDependencyMap();
    for (const eventType in EventApplyMap) {
        const eventApplyFunc = EventApplyMap[eventType as EVENTS];
        if (eventApplyFunc) {
            context.events.subscribe(eventType, async (evt) => {
                await eventApplyFunc(evt, context);
            });
        }
    }
}
