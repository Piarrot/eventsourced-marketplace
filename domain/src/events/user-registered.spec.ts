import { createEvent } from "../utils/events";
import { UserRegisteredEvent, applyUserRegistered } from "./user-registered";

describe("UserRegistered", () => {
    test("given an event it should create a new user entity", () => {
        // given
        const event: UserRegisteredEvent = createEvent(
            "user-registered",
            "123",
            {
                name: "John Doe",
                email: "test@email.com",
                hashedPassword: "123456",
                profilePicture: "https://www.google.com",
            }
        );

        // when
        const user = applyUserRegistered(event);

        // then
        expect(user).toEqual({
            id: event.userId,
            name: event.payload.name,
            email: event.payload.email,
            profilePicture: event.payload.profilePicture,
            hashedPassword: event.payload.hashedPassword,
            registeredAt: event.timestamp,
            lastUpdate: event.timestamp,
        });
    });
});
