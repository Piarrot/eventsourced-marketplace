import { randomUUID } from "crypto";
import { Product } from "../entities/product-entity";

export function createValidProduct(
    ownerId: string,
    categoryIds?: string[],
    images?: string[]
): Product {
    const randomizedHash = randomUUID();
    return {
        id: randomizedHash,
        name: "product-" + randomizedHash,
        price: Math.random() * 1000,
        discount: Math.random() * 80,
        description: "valid-description" + randomizedHash,
        ownerId,
        published: true,
        publicationChangedAt: Date.now(),
        createdAt: Date.now(),
        lastUpdate: Date.now(),
        categoryIds: categoryIds ?? [],
        images: images ?? [],
    };
}
