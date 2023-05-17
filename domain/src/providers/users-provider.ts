import { User } from "../entities/user.js";

export interface IUsersProvider {
    getById(userId: string): Promise<User | undefined>;
    getByEmail(email: string): Promise<User | undefined>;
    isEmailRegistered(email: string): Promise<boolean>;
}
