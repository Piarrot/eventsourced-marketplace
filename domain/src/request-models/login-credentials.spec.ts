import { parseLoginCredentials } from ".";
import { ResultRecord } from "..";

describe("Parse LoginCredentials", () => {
    test("given a valid payload, should parse without errors", () => {
        //given
        const payload = {
            email: "email@test.com",
            password: "password",
        };

        //when
        const result = parseLoginCredentials(payload);

        //then
        if (!ResultRecord.isSuccess(result)) {
            throw new Error("Parsing should be success");
        }

        expect(result.values).toEqual({
            email: "email@test.com",
            password: "password",
        });
    });

    test("given an empty payload, should parse with errors", () => {
        //given
        const payload = {};

        //when
        const result = parseLoginCredentials(payload);

        //then
        if (ResultRecord.isSuccess(result)) {
            throw new Error("Parsing should not be success");
        }

        expect(result.errors).toEqual({
            email: "SHOULD_BE_EMAIL",
            password: "SHOULD_BE_STRING",
        });
        expect(result.values).toEqual({});
    });

    test("given a partially valid payload, should parse with errors", () => {
        //given
        const payload = {
            email: "email@test.com",
        };

        //when
        const result = parseLoginCredentials(payload);

        //then
        if (ResultRecord.isSuccess(result)) {
            throw new Error("Parsing should not be success");
        }

        expect(result.errors).toEqual({
            password: "SHOULD_BE_STRING",
        });
        expect(result.values).toEqual({
            email: "email@test.com",
        });
    });
});
