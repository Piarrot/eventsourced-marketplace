import { Result } from "./result";

describe("Result", () => {
    test("given a value, it should return true for isValue", () => {
        const result = Result.fromValue("value");
        expect(Result.isValue(result)).toBe(true);
    });
    test("given an error, it should return true for isError", () => {
        const result = Result.fromError("error");
        expect(Result.isError(result)).toBe(true);
    });
    test("given a value, it should return false for isError", () => {
        const result = Result.fromValue("value");
        expect(Result.isError(result)).toBe(false);
    });
    test("given a value, it should return the value for unwrap", () => {
        const result = Result.fromValue("value");
        expect(Result.unwrap(result)).toBe("value");
    });
    test("given an error, we cannot unwrap it", () => {
        const result = Result.fromError("error");
        // expect(() => Result.unwrap(result)).toThrowError("error"); //expected compiler error
    });
});
