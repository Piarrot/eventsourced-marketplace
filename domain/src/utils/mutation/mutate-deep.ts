import { deepClone } from "../cloning/deep-clone";

export function mutateDeep<T>(
    thing: T,
    mutation: (safeToMutateThing: T) => void
) {
    const copiedThing = deepClone(thing);
    mutation(copiedThing);
    return copiedThing;
}
