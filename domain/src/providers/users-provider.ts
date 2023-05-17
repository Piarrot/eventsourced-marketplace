import { User } from "../entities/user.js";

export interface IUsersProvider {
    getByEmail(email: string): Promise<User | undefined>;
    isEmailRegistered(email: string): Promise<boolean>;
}
