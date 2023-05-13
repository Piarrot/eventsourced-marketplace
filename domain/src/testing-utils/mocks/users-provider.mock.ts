import { User } from "../../entities/user-entity";
import { IUsersProvider } from "../../providers/aggregate-stores/users-provider";

export class UserProviderMock implements IUsersProvider {
    async isEmailRegistered(email: string): Promise<boolean> {
        return this.users.some((u) => u.email === email);
    }

    /// Mocking utilities
    private users: User[] = [];

    addUsers(users: User[]) {
        this.users.push(...users);
    }
}
