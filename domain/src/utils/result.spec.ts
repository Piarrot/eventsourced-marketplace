import { Result } from "./result";

describe("Result", () => {
    test("given a value, it should return true for isValue", () => {
        const result = Result.success("value");
        expect(Result.isSuccess(result)).toBe(true);
    });
    test("given an error, it should return true for isError", () => {
        const result = Result.fail("error");
        expect(Result.isFailure(result)).toBe(true);
    });
    test("given a value, it should return false for isError", () => {
        const result = Result.success("value");
        expect(Result.isFailure(result)).toBe(false);
    });
    test("given a value, it should return the value for unwrap", () => {
        const result = Result.success("value");
        expect(Result.unwrap(result)).toBe("value");
    });
    test("given an error, we cannot unwrap the value", () => {
        const result = Result.fail("error");
        // expect(() => Result.unwrap(result)).toThrowError("error"); //expected compiler error
    });
    test("given an error, we can unwrap the error", () => {
        const result = Result.fail("error");
        expect(Result.unwrapError(result)).toBe("error");
    });
});
