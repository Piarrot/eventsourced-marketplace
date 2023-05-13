import { getDefaultContext } from "../testing-utils/default-testing-context";
import { UserRegisteredEvent, applyUserRegistered } from "./user-registered";

describe("UserRegistered", () => {
    test("given an event it should create a new user entity", async () => {
        // given
        const event: UserRegisteredEvent = {
            type: "user-registered",
            userId: "123",
            payload: {
                name: "John Doe",
                email: "test@email.com",
                hashedPassword: "123456",
                profilePicture: "profile-picture",
            },
            timestamp: 123456,
        };
        const context = getDefaultContext();

        // when
        await applyUserRegistered(event, context);

        // then
        const user = await context.users.getByEmail(event.payload.email);
        expect(user).toEqual({
            id: event.userId,
            name: event.payload.name,
            email: event.payload.email,
            profilePicture: event.payload.profilePicture,
            hashedPassword: event.payload.hashedPassword,
            registeredAt: event.timestamp,
        });
    });
});
