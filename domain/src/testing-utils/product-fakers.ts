import { randomUUID } from "crypto";
import { Product } from "../entities/product.js";

export function createValidProduct(
    ownerId: string,
    opts?: {
        categoryIds?: string[];
        images?: string[];
        discount?: number;
    }
): Product {
    const randomizedHash = randomUUID();
    return {
        id: randomizedHash,
        name: "product-" + randomizedHash,
        price: Math.random() * 1000,
        discount: opts?.discount ?? Math.random() * 80,
        description: "valid-description" + randomizedHash,
        ownerId,
        published: true,
        publicationChangedAt: Date.now(),
        createdAt: Date.now(),
        lastUpdate: Date.now(),
        categoryIds: opts?.categoryIds ?? [],
        images: opts?.images ?? [],
    };
}
