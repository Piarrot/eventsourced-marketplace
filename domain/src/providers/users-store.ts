import { User } from "../entities/user";

export interface IUsersStore {
    create(user: User): Promise<void>;
}
