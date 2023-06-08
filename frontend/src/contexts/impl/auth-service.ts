import { UserResponseModel } from "marketplace-domain";
import { IAuthContext } from "../auth-context.ts";

export class AuthContextImpl implements IAuthContext {
    currentUser: UserResponseModel | null = null;
    setCurrentUser(user: UserResponseModel): void {
        this.currentUser = user;
    }
}
