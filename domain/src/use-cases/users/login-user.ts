import { ERRORS, INVALID_CREDENTIALS_ERROR } from "../../errors/errors";
import { LoginEvent, LoginEventType } from "../../events/user-logged-in";
import { IUsersProvider } from "../../providers/aggregate-stores/users-provider";
import { ICryptoProvider } from "../../providers/crypto-provider";
import { ITimeProvider } from "../../providers/time-provider";
import { Result } from "../../utils/result";

export interface LoginContext {
    users: IUsersProvider;
    crypto: ICryptoProvider;
    time: ITimeProvider;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export async function Login(
    payload: LoginPayload,
    context: LoginContext
): Promise<Result<LoginEvent, INVALID_CREDENTIALS_ERROR>> {
    const foundUser = await context.users.getByEmail(payload.email);
    if (!foundUser) {
        return Result.fromError(ERRORS.INVALID_CREDENTIALS);
    }
    if (
        !(await context.crypto.verifyPassword(
            payload.password,
            foundUser.hashedPassword
        ))
    ) {
        return Result.fromError(ERRORS.INVALID_CREDENTIALS);
    }

    return Result.fromValue({
        type: LoginEventType,
        userId: foundUser.id,
        timestamp: await context.time.currentTimestamp(),
        payload: {
            token: await context.crypto.generateJWT(foundUser),
        },
    });
}
