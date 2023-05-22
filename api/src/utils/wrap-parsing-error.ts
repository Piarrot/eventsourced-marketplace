import { Response } from "express";
import { ResultRecord } from "marketplace-domain";

export function wrapParsingError(
    res: Response,
    error: ResultRecord<any, string>
) {
    res.status(400).json(error);
}
