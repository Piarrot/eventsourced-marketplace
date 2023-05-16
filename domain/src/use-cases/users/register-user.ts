import { ICryptoProvider } from "../../providers/crypto-provider";
import { ITimeProvider } from "../../providers/time-provider";
import { UserRegisteredEvent } from "../../events/users/user-registered";
import { EMAIL_ALREADY_REGISTERED_ERROR, ERRORS } from "../../errors";
import { IUsersProvider } from "../../providers/users-provider";
import { IEventStore } from "../../providers/event-store";
import { CommandResponse } from "../../utils/command-response";
import { USER_EVENTS } from "../../events/users/user-events";
import { RegisterUserPayload } from "../../request-models/register-payload";

export interface RegisterUserContext {
    time: ITimeProvider;
    crypto: ICryptoProvider;
    users: IUsersProvider;
    eventStore: IEventStore;
}

export async function RegisterUserUseCase(
    payload: RegisterUserPayload,
    context: RegisterUserContext
): Promise<CommandResponse<EMAIL_ALREADY_REGISTERED_ERROR>> {
    if (await context.users.isEmailRegistered(payload.email)) {
        return CommandResponse.failure(ERRORS.EMAIL_ALREADY_REGISTERED);
    }

    await context.eventStore.publish<UserRegisteredEvent>({
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
