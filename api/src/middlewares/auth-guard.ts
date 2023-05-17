import { NextFunction, Request, Response } from "express";

export async function authGuard(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (res.locals.currentUser) {
        next();
    } else {
        res.status(401).send();
    }
}
