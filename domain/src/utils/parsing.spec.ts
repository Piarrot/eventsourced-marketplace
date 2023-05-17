import { parseNumber, parseString, parseArray, parseEmail } from "./parsing.js";
import { Result } from "./index.js";

describe("Parsing utils", () => {
    test("parseString", () => {
        //Valid parsing
        expect(Result.isSuccess(parseString("string"))).toBe(true);
        expect(Result.isSuccess(parseString("", { optional: true }))).toBe(
            true
        );
        expect(
            Result.isSuccess(parseString(undefined, { optional: true }))
        ).toBe(true);

        //Invalid parsing
        expect(Result.isSuccess(parseString(undefined))).toBe(false);
        expect(Result.isSuccess(parseString(5))).toBe(false);
    });

    test("parseNumber", () => {
        //Valid parsing
        expect(Result.isSuccess(parseNumber(5))).toBe(true);
        expect(Result.isSuccess(parseNumber("5"))).toBe(true);
        expect(Result.isSuccess(parseNumber("5.2"))).toBe(true);
        expect(
            Result.isSuccess(parseNumber(undefined, { optional: true }))
        ).toBe(true);

        //Invalid parsing
        expect(Result.isSuccess(parseNumber("banana"))).toBe(false);
        expect(
            Result.isSuccess(parseNumber("banana", { optional: true }))
        ).toBe(false);
        expect(Result.isSuccess(parseNumber(undefined))).toBe(false);
    });

    test("parseEmail", () => {
        //Valid parsing
        expect(Result.isSuccess(parseEmail("email@email.com"))).toBe(true);
        expect(
            Result.isSuccess(parseEmail("email@email.com", { optional: true }))
        ).toBe(true);
        expect(
            Result.isSuccess(parseEmail(undefined, { optional: true }))
        ).toBe(true);

        //Invalid parsing
        expect(Result.isSuccess(parseEmail("banana"))).toBe(false);
        expect(Result.isSuccess(parseEmail("banana", { optional: true }))).toBe(
            false
        );
        expect(Result.isSuccess(parseEmail(5))).toBe(false);
        expect(Result.isSuccess(parseEmail(undefined))).toBe(false);
    });

    test("parseArray", () => {
        //Valid parsing
        expect(Result.isSuccess(parseArray(["string"], parseString))).toBe(
            true
        );
        expect(
            Result.isSuccess(
                parseArray(["string"], parseString, {
                    optional: true,
                })
            )
        ).toBe(true);
        expect(
            Result.isSuccess(
                parseArray(undefined, parseString, {
                    optional: true,
                })
            )
        ).toBe(true);
        expect(
            Result.isSuccess(parseArray([5], parseNumber, { min: 1, max: 1 }))
        ).toBe(true);

        //Invalid parsing
        expect(Result.isSuccess(parseArray(["string"], parseNumber))).toBe(
            false
        );
        expect(
            Result.isSuccess(
                parseArray(["string"], parseNumber, {
                    optional: true,
                })
            )
        ).toBe(false);
        expect(Result.isSuccess(parseArray(5, parseString))).toBe(false);
        expect(Result.isSuccess(parseArray(undefined, parseString))).toBe(
            false
        );
        expect(
            Result.isSuccess(parseArray([5], parseNumber, { min: 2, max: 2 }))
        ).toBe(false);
        expect(
            Result.isSuccess(
                parseArray([5, 1, 8], parseNumber, { min: 1, max: 2 })
            )
        ).toBe(false);
    });
});
