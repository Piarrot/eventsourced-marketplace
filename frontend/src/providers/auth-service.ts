import { Observable } from "@ulthar/typey";
import { UserResponseModel } from "marketplace-domain";

export interface IAuthServiceProvider {
    currentUser(): Observable<UserResponseModel | null>;
    setCurrentUser(user: UserResponseModel): void;
}
