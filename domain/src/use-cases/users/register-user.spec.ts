import { DOMAIN_ERRORS } from "../../errors/index.js";
import { createTestingContext } from "../../testing-utils/default-testing-context.js";
import { createValidUser } from "../../testing-utils/user-fakers.js";
import { RegisterUserUseCase } from "./register-user.js";
import { CommandResponse } from "../../utils/command-response.js";
import { USER_EVENTS } from "../../events/users/user-events.js";

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
            context.events.getEventStream(USER_EVENTS.USER_CREATED)[0]
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
            expect(result.error).toEqual(
                DOMAIN_ERRORS.EMAIL_ALREADY_REGISTERED
            );
        } else {
            fail("Expected an error");
        }
    });
});
