import { ResultRecord, parseEmail, parseString } from "../index.js";

export interface LoginCredentials {
    email: string;
    password: string;
}

export function parseLoginCredentials(
    payload: any
): ResultRecord<LoginCredentials, string> {
    return ResultRecord.unwrap<LoginCredentials, string>({
        email: parseEmail(payload.email),
        password: parseString(payload.password),
    });
}
