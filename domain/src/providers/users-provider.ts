import { User } from "../entities/user";

export interface IUsersProvider {
    getByEmail(email: string): Promise<User | undefined>;
    isEmailRegistered(email: string): Promise<boolean>;
}
