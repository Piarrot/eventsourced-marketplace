export const ERRORS = {
    EMAIL_ALREADY_REGISTERED: "EMAIL_ALREADY_REGISTERED",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
} as const;

export type EMAIL_ALREADY_REGISTERED_ERROR =
    typeof ERRORS.EMAIL_ALREADY_REGISTERED;
export type INVALID_CREDENTIALS_ERROR = typeof ERRORS.INVALID_CREDENTIALS;
