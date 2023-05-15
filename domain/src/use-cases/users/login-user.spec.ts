import { ERRORS } from "../../errors/errors";
import { LoginEventType } from "../../events/users/user-logged-in";
import { createTestingContext } from "../../testing-utils/default-testing-context";
import { createValidUser } from "../../testing-utils/user-fakers";
import { QueryResponse } from "../../utils/query-response";
import { Login } from "./login-user";

describe("Login User", () => {
    test("given the user is registered and a valid payload, it should return a login event", async () => {
        // given
        const user = createValidUser();
        const payload = {
            email: user.email,
            password: user.id, // by default, the password is the user id
        };
        const context = createTestingContext();
        context.users.addUsers([user]);

        // when
        const result = await Login(payload, context);

        // then
        if (QueryResponse.isFailure(result))
            throw new Error("should not be an error");
        const data = result.data;
        expect(data).toEqual({
            token: "JWT-" + user.email + "-" + user.id + "-mock",
        });
        expect(context.eventStore.getEventStream(LoginEventType)[0]).toEqual({
            type: LoginEventType,
            userId: user.id,
            timestamp: context.time.currentTimestamp(),
            payload: {},
        });
    });

    test("given the user is not registered, it should return an error", async () => {
        //given
        const payload = {
            email: "not-registered-email",
            password: "not-registered-password",
        };
        const context = createTestingContext();

        // when
        const result = await Login(payload, context);

        // then
        if (QueryResponse.isSuccess(result))
            throw new Error("should not be a success");

        expect(result.error).toEqual(ERRORS.INVALID_CREDENTIALS);
    });

    test("given an invalid password, it should return an error", async () => {
        //given
        const user = createValidUser();
        const payload = {
            email: user.email,
            password: "invalid-password",
        };
        const context = createTestingContext();
        context.users.addUsers([user]);

        // when
        const result = await Login(payload, context);

        // then
        if (QueryResponse.isSuccess(result))
            throw new Error("should not be a success");

        expect(result.error).toEqual(ERRORS.INVALID_CREDENTIALS);
    });
});
