import { QueryResponse, Result } from "../index.js";
import { createTestingContext } from "../testing-utils/default-testing-context.js";
import { createValidUser } from "../testing-utils/user-fakers.js";
import { getUserFromToken } from "./get-user-from-token.js";

describe("Get User From Token", () => {
    test("given a valid token should return a user", async () => {
        //given
        const context = createTestingContext();
        const user = createValidUser();
        context.users.addUsers([user]);
        const token = await context.crypto.generateJWT(user);
        //when
        const result = await getUserFromToken(token, context);
        //then
        if (Result.isFailure(result)) {
            throw new Error("Unexpected failure");
        }
        expect(result.value).toEqual(user);
    });

    test("given an invalid token should return an error", async () => {
        //given
        const context = createTestingContext();
        const user = createValidUser();
        context.users.addUsers([user]);
        const token = "invalid-token";

        //when
        const result = await getUserFromToken(token, context);

        //then
        if (Result.isSuccess(result)) {
            throw new Error("Unexpected success");
        }
        expect(result.error).toEqual("INVALID_JWT");
    });
});
