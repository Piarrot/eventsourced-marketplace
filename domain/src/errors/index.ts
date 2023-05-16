export const ERRORS = {
    EMAIL_ALREADY_REGISTERED: "EMAIL_ALREADY_REGISTERED",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    PERMISSION_DENIED: "PERMISSION_DENIED",
    INVALID_PRODUCT: "INVALID_PRODUCT",
} as const;

export type EMAIL_ALREADY_REGISTERED_ERROR =
    typeof ERRORS.EMAIL_ALREADY_REGISTERED;
export type INVALID_CREDENTIALS_ERROR = typeof ERRORS.INVALID_CREDENTIALS;
export type PERMISSION_DENIED_ERROR = typeof ERRORS.PERMISSION_DENIED;
export type INVALID_PRODUCT_ERROR = typeof ERRORS.INVALID_PRODUCT;