import { User } from "../entities/user.js";

export interface IUsersStore {
    create(user: User): Promise<void>;
}
