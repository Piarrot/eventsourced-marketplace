import { User } from "../entities/user-entity";

export interface IUsersProvider {
    getByEmail(email: string): Promise<User | undefined>;
    isEmailRegistered(email: string): Promise<boolean>;
}
