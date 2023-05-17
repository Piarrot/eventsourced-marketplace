import { DOMAIN_ERRORS } from "marketplace-domain";
import { ErrorDefinition } from "./utils/api-boundary.js";

export const ErrorMap: Record<DOMAIN_ERRORS, ErrorDefinition> = {
    EMAIL_ALREADY_REGISTERED: {
        message: "Email already registered",
        code: 400,
    },
    INVALID_CREDENTIALS: {
        message: "Invalid credentials",
        code: 400,
    },
    PERMISSION_DENIED: {
        message: "Permission denied",
        code: 403,
    },
    INVALID_PRODUCT: {
        message: "Invalid product",
        code: 400,
    },
};
