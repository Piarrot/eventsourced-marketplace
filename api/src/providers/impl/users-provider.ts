import { IUsersProvider, IUsersStore, User } from "mercadoliebre-domain";

export class UsersProvider implements IUsersProvider, IUsersStore {
    private users: Record<string, User> = {};

    getByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(
            Object.values(this.users).find((user) => user.email === email)
        );
    }
    isEmailRegistered(email: string): Promise<boolean> {
        return Promise.resolve(
            Object.values(this.users).some((user) => user.email === email)
        );
    }
    create(user: User): Promise<void> {
        this.users[user.id] = user;
        return Promise.resolve();
    }

    getById(userId: string): Promise<User | undefined> {
        return Promise.resolve(this.users[userId]);
    }
}
