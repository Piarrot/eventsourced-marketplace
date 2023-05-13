import { User } from "../../entities/user-entity";

export interface IUsersSnapshotStore {
    create(user: User): Promise<void>;
}
