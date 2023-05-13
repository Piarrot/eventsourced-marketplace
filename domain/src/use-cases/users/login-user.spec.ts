import { ERRORS } from "../../errors/errors";
import { getDefaultContext } from "../../testing-utils/default-testing-context";
import { createValidUser } from "../../testing-utils/user-fakers";
import { Result } from "../../utils/result";
import { Login } from "./login-user";

describe("Login User", () => {
    test("given the user is registered and a valid payload, it should return a login event", async () => {
        // given
        const user = createValidUser();
        const payload = {
            email: user.email,
            password: user.id, // by default, the password is the user id
        };
        const context = getDefaultContext();
        context.users.addUsers([user]);

        // when
        const result = await Login(payload, context);

        // then
        if (Result.isError(result)) throw new Error("should not be an error");
        const event = Result.unwrap(result);
        expect(event).toEqual({
            type: "user-logged-in",
            userId: user.id,
            timestamp: context.time.currentTimestamp(),
            payload: {
                token: "JWT-" + user.email + "-" + user.id + "-mock",
            },
        });
    });

    test("given the user is not registered, it should return an error", async () => {
        //given
        const payload = {
            email: "not-registered-email",
            password: "not-registered-password",
        };
        const context = getDefaultContext();

        // when
        const result = await Login(payload, context);

        // then
        if (Result.isSuccess(result))
            throw new Error("should not be a success");

        expect(Result.unwrapError(result)).toEqual(ERRORS.INVALID_CREDENTIALS);
    });

    test("given an invalid password, it should return an error", async () => {
        //given
        const user = createValidUser();
        const payload = {
            email: user.email,
            password: "invalid-password",
        };
        const context = getDefaultContext();
        context.users.addUsers([user]);

        // when
        const result = await Login(payload, context);

        // then
        if (Result.isSuccess(result))
            throw new Error("should not be a success");

        expect(Result.unwrapError(result)).toEqual(ERRORS.INVALID_CREDENTIALS);
    });
});
