import { Request, Response } from "express";

export function PayloadParser() {
    return function (req: Request, res: Response, next: Function) {
        res.locals.payload = {
            ...req.params,
        };
    };
}
