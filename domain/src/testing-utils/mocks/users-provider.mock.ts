import { User } from "../../entities/user";
import { IUsersProvider } from "../../providers/users-provider";
import { IUsersSnapshotStore } from "../../providers/users-store";

export class UserProviderMock implements IUsersProvider, IUsersSnapshotStore {
    async getByEmail(email: string): Promise<User | undefined> {
        return this.users.find((u) => u.email === email);
    }
    async isEmailRegistered(email: string): Promise<boolean> {
        return this.users.some((u) => u.email === email);
    }
    async create(user: User): Promise<void> {
        this.users.push(user);
    }

    /// Mocking utilities
    private users: User[] = [];

    addUsers(users: User[]) {
        this.users.push(...users);
    }
}
