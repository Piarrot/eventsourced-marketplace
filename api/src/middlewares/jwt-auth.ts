import { NextFunction, Request, Response } from "express";
import { Result, getUserFromToken } from "marketplace-domain";
import { dependencyContainer } from "../container.js";

export async function jwtAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token) {
        const result = await getUserFromToken(token, dependencyContainer);
        if (Result.isSuccess(result)) {
            res.locals.currentUser = result.value;
        } else {
            console.log(result.error);
        }
    }

    next();
}
