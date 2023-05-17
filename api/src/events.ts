import { EVENTS, EventApplyMap } from "mercadoliebre-domain";
import { Dependencies } from "./container.js";

export function subscribeEventAppliers(context: Dependencies) {
    for (const eventType in EventApplyMap) {
        const element = EventApplyMap[eventType as EVENTS];
        if (element) {
            context.events.subscribe(eventType, async (evt) => {
                await element(evt, context);
            });
        }
    }
}
