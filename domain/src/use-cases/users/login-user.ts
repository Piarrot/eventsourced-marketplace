import { ERRORS, INVALID_CREDENTIALS_ERROR } from "../../errors/errors";
import { LoginEvent, LoginEventType } from "../../events/user-logged-in";
import { IUsersProvider } from "../../providers/aggregate-stores/users-provider";
import { ICryptoProvider } from "../../providers/crypto-provider";
import { IEventStore } from "../../providers/event-store";
import { ITimeProvider } from "../../providers/time-provider";
import { Result } from "../../utils/result";

export interface LoginContext {
    users: IUsersProvider;
    crypto: ICryptoProvider;
    time: ITimeProvider;
    eventStore: IEventStore;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponseModel {
    token: string;
}

export async function Login(
    payload: LoginPayload,
    context: LoginContext
): Promise<Result<LoginResponseModel, INVALID_CREDENTIALS_ERROR>> {
    const foundUser = await context.users.getByEmail(payload.email);
    if (!foundUser) {
        return Result.fail(ERRORS.INVALID_CREDENTIALS);
    }
    if (
        !(await context.crypto.verifyPassword(
            payload.password,
            foundUser.hashedPassword
        ))
    ) {
        return Result.fail(ERRORS.INVALID_CREDENTIALS);
    }

    const token = await context.crypto.generateJWT(foundUser);

    await context.eventStore.publish<LoginEvent>({
        type: LoginEventType,
        userId: foundUser.id,
        timestamp: context.time.currentTimestamp(),
        payload: undefined,
    });

    return Result.ok({
        token,
    });
}
