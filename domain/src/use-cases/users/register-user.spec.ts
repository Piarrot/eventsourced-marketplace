import { ERRORS } from "../../errors";
import { createTestingContext } from "../../testing-utils/default-testing-context";
import { createValidUser } from "../../testing-utils/user-fakers";
import { RegisterUserUseCase } from "./register-user";
import { CommandResponse } from "../../utils/command-response";
import { USER_EVENTS } from "../../events/users/user-events";

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
        const result = await RegisterUserUseCase(payload, context);
        //then
        if (CommandResponse.isFailure(result)) {
            fail("Expected a value");
        }

        expect(result.success).toEqual(true);

        expect(
            context.eventStore.getEventStream(USER_EVENTS.USER_CREATED)[0]
        ).toEqual({
            type: USER_EVENTS.USER_CREATED,
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
        const result = await RegisterUserUseCase(payload, context);
        //then
        if (CommandResponse.isFailure(result)) {
            expect(result.error).toEqual(ERRORS.EMAIL_ALREADY_REGISTERED);
        } else {
            fail("Expected an error");
        }
    });
});
