import { NextFunction, Request, Response } from "express";
import { Result, getUserFromToken } from "marketplace-domain";
import { container } from "../container.js";

export async function jwtAuth(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        const token = authorizationHeader.split(" ")[1];
        if (token) {
            const result = await getUserFromToken(
                token,
                container.getPlainDependencyMap()
            );
            if (Result.isSuccess(result)) {
                res.locals.currentUser = result.value;
            } else {
                console.log(result.error);
            }
        }
    }

    next();
}
