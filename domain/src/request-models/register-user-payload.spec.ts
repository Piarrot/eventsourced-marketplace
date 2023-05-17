import { ResultRecord, parseRegisterUserPayload } from "../index.js";

describe("Parse RegisterPayload", () => {
    test("given a valid payload, should parse without errors", () => {
        //given
        const payload = {
            email: "email@test.com",
            plainPassword: "password",
            name: "name",
            profilePicture: "profilePicture",
        };

        //when
        const result = parseRegisterUserPayload(payload);

        //then
        if (ResultRecord.isFailure(result)) {
            console.log(result);
            throw new Error("Parsing should be success");
        }

        expect(result.values).toEqual({
            email: "email@test.com",
            plainPassword: "password",
            name: "name",
            profilePicture: "profilePicture",
        });
    });

    test("given an empty payload, should parse with errors", () => {
        //given
        const payload = {};

        //when
        const result = parseRegisterUserPayload(payload);

        //then
        if (ResultRecord.isSuccess(result)) {
            throw new Error("Parsing should not be success");
        }

        expect(result.errors).toEqual({
            email: "SHOULD_BE_EMAIL",
            plainPassword: "SHOULD_BE_STRING",
            name: "SHOULD_BE_STRING",
            profilePicture: "SHOULD_BE_STRING",
        });
        expect(result.values).toEqual({});
    });

    test("given a partially valid payload, should parse with errors", () => {
        //given
        const payload = {
            email: "email@test.com",
            plainPassword: "password",
        };

        //when
        const result = parseRegisterUserPayload(payload);

        //then
        if (ResultRecord.isSuccess(result)) {
            throw new Error("Parsing should not be success");
        }

        expect(result.errors).toEqual({
            name: "SHOULD_BE_STRING",
            profilePicture: "SHOULD_BE_STRING",
        });

        expect(result.values).toEqual({
            email: "email@test.com",
            plainPassword: "password",
        });
    });
});
