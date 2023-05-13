import { User } from "../entities/user-entity";
import { Event } from "../utils/events";

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

export function applyUserRegistered(event: UserRegisteredEvent): User {
    return {
        id: event.userId,
        name: event.payload.name,
        email: event.payload.email,
        profilePicture: event.payload.profilePicture,
        hashedPassword: event.payload.hashedPassword,
        registeredAt: event.timestamp,
        lastUpdate: event.timestamp,
    };
}
