import { User } from "../../entities/user.js";
import { Result } from "../../index.js";
import {
    ICryptoProvider,
    JWTPayload,
} from "../../providers/crypto-provider.js";

export class CryptoProviderMock implements ICryptoProvider {
    async hashPassword(plainPassword: string) {
        return `hashed-${plainPassword}`;
    }
    async newUUID() {
        this.lastId++;
        return "uuid-" + this.lastId + "-mock";
    }
    async verifyPassword(plainPassword: string, hash: string) {
        return `hashed-${plainPassword}` === hash;
    }

    async verifyJWT(token: string): Promise<Result<JWTPayload, "INVALID_JWT">> {
        const data = token.split("$$");
        if (data.length !== 5) {
            return Result.fail("INVALID_JWT");
        }
        const [, email, id, name] = data;

        return Result.success({
            email,
            id,
            name,
        });
    }

    async generateJWT(user: User): Promise<string> {
        return (
            "JWT$$" + user.email + "$$" + user.id + "$$" + user.name + "$$mock"
        );
    }

    /// Mocking utilities
    private lastId: number = 0;

    getLastId() {
        return "uuid-" + this.lastId + "-mock";
    }
}
