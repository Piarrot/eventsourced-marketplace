import { IUsersSnapshotStore } from "../../providers/users-store";
import { Event } from "../../utils/event";
import { USER_CREATED_EVENT } from "./user-events";

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
    users: IUsersSnapshotStore;
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
