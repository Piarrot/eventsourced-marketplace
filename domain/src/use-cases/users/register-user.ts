import { ICryptoProvider } from "../../providers/crypto-provider";
import { ITimeProvider } from "../../providers/time-provider";
import {
    UserRegisteredEvent,
    UserRegisteredEventType,
} from "../../events/user-registered";
import { Result } from "../../utils/result";
import { EMAIL_ALREADY_REGISTERED_ERROR, ERRORS } from "../../errors/errors";
import { IUsersProvider } from "../../providers/aggregate-stores/users-provider";

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
}

export async function RegisterUser(
    payload: RegisterUserCommandPayload,
    context: RegisterUserCommandContext
): Promise<Result<UserRegisteredEvent, EMAIL_ALREADY_REGISTERED_ERROR>> {
    if (await context.users.isEmailRegistered(payload.email)) {
        return Result.fromError(ERRORS.EMAIL_ALREADY_REGISTERED);
    }
    return Result.fromValue({
        type: UserRegisteredEventType,
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
}
