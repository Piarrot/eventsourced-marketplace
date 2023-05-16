import { ERRORS, INVALID_CREDENTIALS_ERROR } from "../../errors";
import { LoginEvent, LoginEventType } from "../../events/users/user-logged-in";
import { IUsersProvider } from "../../providers/users-provider";
import { ICryptoProvider } from "../../providers/crypto-provider";
import { IEventStore } from "../../providers/event-store";
import { ITimeProvider } from "../../providers/time-provider";
import { QueryResponse } from "../../utils/query-response";
import { QueryUseCase } from "../../utils/use-cases";
import { LoginToken } from "../../response-models/login-token";
import { LoginCredentials } from "../../request-models/login-credentials";

export interface LoginContext {
    users: IUsersProvider;
    crypto: ICryptoProvider;
    time: ITimeProvider;
    eventStore: IEventStore;
}
export const LoginUser: QueryUseCase<
    LoginCredentials,
    LoginContext,
    LoginToken,
    INVALID_CREDENTIALS_ERROR
> = async (payload, context) => {
    const foundUser = await context.users.getByEmail(payload.email);
    if (!foundUser) {
        return QueryResponse.failure(ERRORS.INVALID_CREDENTIALS);
    }
    if (
        !(await context.crypto.verifyPassword(
            payload.password,
            foundUser.hashedPassword
        ))
    ) {
        return QueryResponse.failure(ERRORS.INVALID_CREDENTIALS);
    }

    const token = await context.crypto.generateJWT(foundUser);

    await context.eventStore.publish<LoginEvent>({
        type: LoginEventType,
        userId: foundUser.id,
        timestamp: context.time.currentTimestamp(),
        payload: {},
    });

    return QueryResponse.success({ token });
};
