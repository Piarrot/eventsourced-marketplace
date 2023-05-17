import {
    ResultRecord,
    parseArray,
    parseNumber,
    parseString,
} from "../index.js";

export interface CreateProductPayload {
    name: string;
    price: number;
    discount: number;
    description: string;
    images: string[];
    categoryIds: string[];
}

export function parseCreateProductPayload(
    payload: any
): ResultRecord<CreateProductPayload, string> {
    return ResultRecord.unwrap<CreateProductPayload, string>({
        name: parseString(payload.name),
        price: parseNumber(payload.price),
        discount: parseNumber(payload.discount),
        description: parseString(payload.description),
        images: parseArray(payload.images, parseString, { min: 1 }),
        categoryIds: parseArray(payload.categoryIds, parseString, { min: 1 }),
    });
}
