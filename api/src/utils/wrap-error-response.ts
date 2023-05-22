import { Response } from "express";
import { DOMAIN_ERRORS, FailureResponse } from "marketplace-domain";

export function wrapErrorResponse(
    res: Response,
    failureResponse: FailureResponse<DOMAIN_ERRORS>,
    errorMap: Record<DOMAIN_ERRORS, ErrorDefinition>
) {
    const errorDefinition = errorMap[failureResponse.error];
    res.status(errorDefinition.code).json(failureResponse);
}

export interface ErrorDefinition {
    message: string;
    code: number;
}
