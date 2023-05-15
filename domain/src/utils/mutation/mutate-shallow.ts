import { shallowClone } from "../cloning/shallow-clone";

export function mutateShallow<T>(
    thing: T,
    mutation: (safeToMutateThing: T) => void
) {
    const copiedThing = shallowClone(thing);
    mutation(copiedThing);
    return copiedThing;
}
