import { ERRORS } from "../../errors/errors";
import { UserRegisteredEventType } from "../../events/user-registered";
import { Result } from "../../utils/result";
import { createTestingContext } from "../../testing-utils/default-testing-context";
import { createValidUser } from "../../testing-utils/user-fakers";
import { RegisterUser } from "./register-user";

describe("Register User", () => {
    test("given some valid credentials, it should emit the correct event", async () => {
        //given
        const payload = {
            name: "John Doe",
            email: "test@email.com",
            plainPassword: "password",
            profilePicture: "profile-picture",
        };
        const context = createTestingContext();
        //when
        const result = await RegisterUser(payload, context);
        //then
        if (Result.isError(result)) {
            fail("Expected a value");
        }

        const response = Result.unwrap(result);
        expect(response).toEqual({
            result: "success",
        });

        expect(
            context.eventStore.getEventStream(UserRegisteredEventType)[0]
        ).toEqual({
            type: UserRegisteredEventType,
            userId: context.crypto.getLastId(),
            timestamp: context.time.currentTimestamp(),
            payload: {
                name: payload.name,
                email: payload.email,
                hashedPassword: await context.crypto.hashPassword(
                    payload.plainPassword
                ),
                profilePicture: payload.profilePicture,
            },
        });
    });

    test("given an email that is already registered, it should emit an error", async () => {
        //given
        const payload = {
            name: "John Doe",
            email: "test@email.com",
            plainPassword: "password",
            profilePicture: "profile-picture",
        };
        const context = createTestingContext();
        context.users.addUsers([createValidUser({ email: payload.email })]);
        //when
        const result = await RegisterUser(payload, context);
        //then
        if (Result.isError(result)) {
            expect(result.error).toEqual(ERRORS.EMAIL_ALREADY_REGISTERED);
        } else {
            fail("Expected an error");
        }
    });
});
