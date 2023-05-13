import { Event } from "../utils/event";

export const LoginEventType = "user-logged-in" as const;
export type LoginEventType = typeof LoginEventType;
export type LoginEvent = Event<LoginEventType, { token: string }>;
