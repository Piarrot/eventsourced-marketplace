import { User } from "../../entities/user";
import { IUsersProvider } from "../../providers/users-provider";
import { IUsersSnapshotStore } from "../../providers/users-store";
import { deepClone } from "../../utils/cloning";

export class UserProviderMock implements IUsersProvider, IUsersSnapshotStore {
    async getByEmail(email: string): Promise<User | undefined> {
        return deepClone(this.users.find((u) => u.email === email));
    }
    async isEmailRegistered(email: string): Promise<boolean> {
        return deepClone(this.users.some((u) => u.email === email));
    }
    async create(user: User): Promise<void> {
        this.users.push(deepClone(user));
    }

    /// Mocking utilities
    private users: User[] = [];

    addUsers(users: User[]) {
        this.users.push(...deepClone(users));
    }
}
