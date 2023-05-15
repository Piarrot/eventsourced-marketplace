import { ICryptoProvider } from "../../providers/crypto-provider";
import { ITimeProvider } from "../../providers/time-provider";
import { UserRegisteredEvent } from "../../events/users/user-registered";
import { EMAIL_ALREADY_REGISTERED_ERROR, ERRORS } from "../../errors/errors";
import { IUsersProvider } from "../../providers/users-provider";
import { IEventStore } from "../../providers/event-store";
import { CommandResponse } from "../../utils/command-response";
import { USER_EVENTS } from "../../events/users/user-events";

export interface RegisterUserCommandPayload {
    name: string;
    email: string;
    plainPassword: string;
    profilePicture: string;
}

export interface RegisterUserCommandContext {
    time: ITimeProvider;
    crypto: ICryptoProvider;
    users: IUsersProvider;
    eventStore: IEventStore;
}

export interface RegisterUserResponseModel {
    result: "success";
}

export async function RegisterUser(
    payload: RegisterUserCommandPayload,
    context: RegisterUserCommandContext
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
