import {
    ICryptoProvider,
    JWTPayload,
    Result,
    User,
} from "mercadoliebre-domain";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export class CryptoProvider implements ICryptoProvider {
    constructor(private jwtSecret: string) {}

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }
    verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
    newUUID(): Promise<string> {
        return Promise.resolve(crypto.randomUUID());
    }
    generateJWT(foundUser: User): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    id: foundUser.id,
                    email: foundUser.email,
                    name: foundUser.name,
                },
                this.jwtSecret,
                { expiresIn: "7d" },
                (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token!);
                    }
                }
            );
        });
    }

    verifyJWT(token: string): Promise<Result<JWTPayload, "INVALID_JWT">> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(Result.fail("INVALID_JWT"));
                } else {
                    resolve(Result.success(decoded as JWTPayload));
                }
            });
        });
    }
}
