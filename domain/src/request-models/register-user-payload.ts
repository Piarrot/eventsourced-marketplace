import { parseEmail, parseString } from "../utils/parsing";
import { ResultRecord } from "../utils/result-record";

export interface RegisterUserPayload {
    name: string;
    email: string;
    plainPassword: string;
    profilePicture: string;
}

export function parseRegisterUserPayload(
    payload: any
): ResultRecord<RegisterUserPayload, string> {
    return ResultRecord.unwrap<RegisterUserPayload, string>({
        name: parseString(payload.name),
        email: parseEmail(payload.email),
        plainPassword: parseString(payload.plainPassword),
        profilePicture: parseString(payload.profilePicture),
    });
}
