import {
    BOUNDARY_HANDLERS,
    BoundaryHandler,
    DOMAIN_ERRORS,
    FailureResponse,
    MESSAGES,
    ResultRecord,
} from "marketplace-domain";
import { Request, Response, Express } from "express";
import { container } from "../container.js";
import { authGuard } from "../middlewares/auth-guard.js";

export type RequestParser = (
    req: Request,
    context: any
) => Promise<Record<string, any>>;

export interface RouteDefinition {
    method: "get" | "post" | "put" | "delete" | "patch";
    path: string;
    requiresAuth?: boolean;
    requestParser: RequestParser;
}

export function defineHTTPBoundaryRoutes(
    app: Express,
    boundaryEndpointsMap: Record<MESSAGES, RouteDefinition>,
    errorMap: Record<DOMAIN_ERRORS, ErrorDefinition>
) {
    for (const [message, route] of Object.entries(boundaryEndpointsMap)) {
        if (route.requiresAuth) {
            app[route.method](route.path, authGuard);
        }
        app[route.method](
            route.path,
            wrapBoundaryHandler(
                route.requestParser,
                BOUNDARY_HANDLERS[message as MESSAGES],
                errorMap
            )
        );
    }
}

export function wrapBoundaryHandler(
    requestParser: RequestParser,
    boundary: BoundaryHandler,
    errorMap: Record<DOMAIN_ERRORS, ErrorDefinition>
) {
    return async (req: Request, res: Response) => {
        const appContext = {
            ...container.getPlainDependencyMap(),
            ...res.locals,
        };
        try {
            const handler = boundary.handler;
            let payload = await requestParser(req, appContext);
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

export function wrapParsingError(
    res: Response,
    error: ResultRecord<any, string>
) {
    res.status(400).json(error);
}

export function wrapErrorResponse(
    res: Response,
    error: FailureResponse<DOMAIN_ERRORS>,
    errorMap: Record<DOMAIN_ERRORS, ErrorDefinition>
) {
    const errorDefinition = errorMap[error.error];
    res.status(errorDefinition.code).json(error);
}

export interface ErrorDefinition {
    message: string;
    code: number;
}
