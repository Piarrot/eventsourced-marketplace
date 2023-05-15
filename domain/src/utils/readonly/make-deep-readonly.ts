import { shallowClone } from "../cloning/shallow-clone";
import { isObject } from "../type-detection/is-object";
import { DeepReadonly } from "./deep-readonly";

export function makeDeepReadonly<T>(thing: T): DeepReadonly<T> {
    if (!isObject(thing)) return thing;
    const inmutableThing = shallowClone(thing);
    for (const key in inmutableThing) {
        if (Object.prototype.hasOwnProperty.call(inmutableThing, key)) {
            inmutableThing[key] = makeDeepReadonly(inmutableThing[key]) as any;
        }
    }
    return Object.freeze(inmutableThing);
}
