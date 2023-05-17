import { User } from "../../entities/user.js";
import { ICryptoProvider } from "../../providers/crypto-provider.js";

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

    async generateJWT(user: User): Promise<string> {
        return "JWT-" + user.email + "-" + user.id + "-mock";
    }

    /// Mocking utilities
    private lastId: number = 0;

    getLastId() {
        return "uuid-" + this.lastId + "-mock";
    }
}
