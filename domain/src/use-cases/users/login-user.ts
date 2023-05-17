import {
    DOMAIN_ERRORS,
    INVALID_CREDENTIALS_ERROR,
} from "../../errors/index.js";
import {
    LoginEvent,
    LoginEventType,
} from "../../events/users/user-logged-in.js";
import { IUsersProvider } from "../../providers/users-provider.js";
import { ICryptoProvider } from "../../providers/crypto-provider.js";
import { IEventStore } from "../../providers/event-store.js";
import { ITimeProvider } from "../../providers/time-provider.js";
import { QueryResponse } from "../../utils/query-response.js";
import { QueryUseCase } from "../../utils/use-cases.js";
import { LoginToken } from "../../response-models/login-token.js";
import { LoginCredentials } from "../../request-models/login-credentials.js";

export interface LoginContext {
    users: IUsersProvider;
    crypto: ICryptoProvider;
    time: ITimeProvider;
    eventStore: IEventStore;
}
export const LoginUserUseCase: QueryUseCase<
    LoginCredentials,
    LoginContext,
    LoginToken,
    INVALID_CREDENTIALS_ERROR
> = async (payload, context) => {
    const foundUser = await context.users.getByEmail(payload.email);
    if (!foundUser) {
        return QueryResponse.failure(DOMAIN_ERRORS.INVALID_CREDENTIALS);
    }
    if (
        !(await context.crypto.verifyPassword(
            payload.password,
            foundUser.hashedPassword
        ))
    ) {
        return QueryResponse.failure(DOMAIN_ERRORS.INVALID_CREDENTIALS);
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
