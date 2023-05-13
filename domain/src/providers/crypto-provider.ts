export interface ICryptoProvider {
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    newUUID(): Promise<string>;
}
