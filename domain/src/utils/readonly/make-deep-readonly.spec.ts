import { makeDeepReadonly } from "./make-deep-readonly";

describe("makeDeepReadonly", () => {
    it("should make an object fully readonly", () => {
        const obj = {
            foo: "bar",
            baz: {
                biz: ["fiz"],
            },
        };

        const readonlyObj = makeDeepReadonly(obj);

        expect(readonlyObj).not.toBe(obj);

        expect(() => {
            (<any>readonlyObj).foo = "something";
        }).toThrow();

        expect(() => {
            (<any>readonlyObj).baz.biz.push("something");
        }).toThrow();
    });
});
