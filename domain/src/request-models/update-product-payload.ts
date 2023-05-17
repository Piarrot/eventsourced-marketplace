import {
    ResultRecord,
    parseArray,
    parseNumber,
    parseString,
} from "../index.js";

export interface UpdateProductPayload {
    id: string;
    name?: string;
    price?: number;
    discount?: number;
    description?: string;
    images?: string[];
    categoryIds?: string[];
}

export function parseUpdateProductPayload(
    payload: any
): ResultRecord<UpdateProductPayload, string> {
    return ResultRecord.unwrap<UpdateProductPayload, string>({
        id: parseString(payload.id),
        name: parseString(payload.name, { optional: true }),
        price: parseNumber(payload.price, { optional: true }),
        discount: parseNumber(payload.discount, { optional: true }),
        description: parseString(payload.description, { optional: true }),
        images: parseArray(payload.images, parseString, { optional: true }),
        categoryIds: parseArray(payload.categoryIds, parseString, {
            optional: true,
        }),
    });
}
