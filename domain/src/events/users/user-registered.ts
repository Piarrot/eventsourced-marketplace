import { IUsersStore } from "../../providers/users-store.js";
import { Event } from "../../utils/event.js";
import { USER_CREATED_EVENT } from "./user-events.js";

export type UserRegisteredEvent = Event<
    USER_CREATED_EVENT,
    {
        name: string;
        email: string;
        hashedPassword: string;
        profilePicture: string;
    }
>;

export interface UserRegisteredContext {
    users: IUsersStore;
}

export async function ApplyUserRegistered(
    event: UserRegisteredEvent,
    context: UserRegisteredContext
): Promise<void> {
    await context.users.create({
        id: event.userId,
        name: event.payload.name,
        email: event.payload.email,
        profilePicture: event.payload.profilePicture,
        hashedPassword: event.payload.hashedPassword,
        registeredAt: event.timestamp,
    });
}
