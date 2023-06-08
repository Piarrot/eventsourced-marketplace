import { EVENTS, EventApplyMap } from "marketplace-domain";
import { dependencyContainer } from "./container.js";

export function subscribeEventAppliers() {
    const context = dependencyContainer.getPlainDependencyMap();
    for (const eventType in EventApplyMap) {
        const eventApplyFunc = EventApplyMap[eventType as EVENTS];
        if (eventApplyFunc) {
            context.events.subscribe(eventType, async (evt) => {
                await eventApplyFunc(evt, context);
            });
        }
    }
}
