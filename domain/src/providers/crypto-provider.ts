import { User } from "../entities/user.js";
import { Result } from "../index.js";

export interface JWTPayload {
    id: string;
    email: string;
    name: string;
}
export interface ICryptoProvider {
    verifyJWT(token: string): Promise<Result<JWTPayload, "INVALID_JWT">>;
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    newUUID(): Promise<string>;
    generateJWT(foundUser: User): Promise<string>;
}
