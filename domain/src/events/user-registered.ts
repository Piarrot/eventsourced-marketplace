import { IUsersSnapshotStore } from "../providers/users-store";
import { Event } from "../utils/event";

export const UserRegisteredEventType = "user-registered" as const;
export type UserRegisteredEventType = typeof UserRegisteredEventType;

export type UserRegisteredEvent = Event<
    UserRegisteredEventType,
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

export async function applyUserRegistered(
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
