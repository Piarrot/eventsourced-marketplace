import { Observable, ObservableSubject } from "@ulthar/typey";
import { UserResponseModel } from "marketplace-domain";
import { IAuthServiceProvider } from "../auth-service.ts";
import { currentUser } from "../../testing-utils/users-data.ts";

export class AuthServiceProvider implements IAuthServiceProvider {
    private $user: ObservableSubject<UserResponseModel> = new ObservableSubject(
        currentUser
    );
    currentUser(): Observable<UserResponseModel | null> {
        return this.$user;
    }
    setCurrentUser(user: UserResponseModel): void {
        this.$user.update(user);
    }
}
