import { BoundaryHandler, DOMAIN_ERRORS } from "marketplace-domain";
import { Request, Response } from "express";
import { dependencyContainer } from "../container.js";
import { ErrorDefinition, wrapErrorResponse } from "./wrap-error-response.js";
import { wrapParsingError } from "./wrap-parsing-error.js";

export type RequestParser = (
    req: Request,
    context: any
) => Promise<Record<string, any>>;

export function wrapBoundaryHandler(
    boundary: BoundaryHandler,
    errorMap: Record<DOMAIN_ERRORS, ErrorDefinition>
) {
    return async (req: Request, res: Response) => {
        const appContext = {
            ...dependencyContainer,
            ...res.locals.currentUser,
        };
        try {
            const handler = boundary.handler;
            let payload = res.locals.payload;
            if (boundary.parser) {
                const result = boundary.parser(payload);
                if (!result.success) {
                    return wrapParsingError(res, result);
                }
                payload = result.values;
            }
            const response = await handler(payload, appContext);

            if (!response.success) {
                appContext.logger.error(response);
                return wrapErrorResponse(res, response, errorMap);
            }

            return res.status(200).json(response);
        } catch (e) {
            appContext.logger.error(e);
            res.status(500).send(e);
        }
    };
}
