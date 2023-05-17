import { User } from "../../entities/user.js";
import { IUsersProvider } from "../../providers/users-provider.js";
import { IUsersStore } from "../../providers/users-store.js";
import { deepClone } from "../../utils/cloning/index.js";

export class UserProviderMock implements IUsersProvider, IUsersStore {
    async getById(userId: string): Promise<User | undefined> {
        return deepClone(this.users.find((u) => u.id === userId));
    }
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
