import { ICryptoProvider } from "../../providers/crypto-provider.js";
import { ITimeProvider } from "../../providers/time-provider.js";
import { UserRegisteredEvent } from "../../events/users/user-registered.js";
import {
    EMAIL_ALREADY_REGISTERED_ERROR,
    DOMAIN_ERRORS,
} from "../../errors/index.js";
import { IUsersProvider } from "../../providers/users-provider.js";
import { IEventStore } from "../../providers/event-store.js";
import { CommandResponse } from "../../utils/command-response.js";
import { USER_EVENTS } from "../../events/users/user-events.js";
import { RegisterUserPayload } from "../../request-models/register-user-payload.js";

export interface RegisterUserContext {
    time: ITimeProvider;
    crypto: ICryptoProvider;
    users: IUsersProvider;
    events: IEventStore;
}

export async function RegisterUserUseCase(
    payload: RegisterUserPayload,
    context: RegisterUserContext
): Promise<CommandResponse<EMAIL_ALREADY_REGISTERED_ERROR>> {
    if (await context.users.isEmailRegistered(payload.email)) {
        return CommandResponse.failure(DOMAIN_ERRORS.EMAIL_ALREADY_REGISTERED);
    }

    await context.events.publish<UserRegisteredEvent>({
        type: USER_EVENTS.USER_CREATED,
        userId: await context.crypto.newUUID(),
        payload: {
            name: payload.name,
            email: payload.email,
            hashedPassword: await context.crypto.hashPassword(
                payload.plainPassword
            ),
            profilePicture: payload.profilePicture,
        },
        timestamp: context.time.currentTimestamp(),
    });

    return CommandResponse.success();
}
