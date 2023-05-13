import { User } from "../entities/user-entity";
import { randomUUID } from "crypto";

export function createValidUser(opts?: Partial<User>): User {
    const randomizedHash = randomUUID();
    return {
        id: randomizedHash,
        email: opts?.email ?? `test-email${randomizedHash}@email.com`,
        name: opts?.name ?? `John Doe ${randomizedHash}`,
        hashedPassword: opts?.hashedPassword ?? `hashed-${randomizedHash}`,
        profilePicture: `profile-picture-${randomizedHash}`,
        registeredAt: Date.now(),
        lastUpdate: Date.now(),
    };
}
