import { User } from "../entities/user";

export interface IUsersSnapshotStore {
    create(user: User): Promise<void>;
}
