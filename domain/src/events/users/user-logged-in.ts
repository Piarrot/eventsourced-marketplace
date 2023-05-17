import { Event } from "../../utils/event.js";

export const LoginEventType = "user-logged-in" as const;
export type LoginEventType = typeof LoginEventType;
export type LoginEvent = Event<LoginEventType, {}>;
