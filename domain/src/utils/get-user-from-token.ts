import { ICryptoProvider, IUsersProvider, Result, User } from "../index.js";

export interface GetUserFromTokenContext {
    users: IUsersProvider;
    crypto: ICryptoProvider;
}

export async function getUserFromToken(
    token: string,
    context: GetUserFromTokenContext
): Promise<Result<User, "INVALID_JWT">> {
    const payload = await context.crypto.verifyJWT(token);
    if (Result.isFailure(payload)) {
        return Result.fail("INVALID_JWT");
    }
    const user = await context.users.getById(payload.value.id);
    if (!user) {
        return Result.fail("INVALID_JWT");
    }
    return Result.success(user);
}
