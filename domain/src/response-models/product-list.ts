import { Product } from "../index.js";
import { ResponseTransformer } from "../utils/response-transformer.js";

export interface ProductListResponseModel {
    id: string;
    name: string;
    price: number;
    discount: number;

    description: string;

    published: boolean;
    publicationChangedAt?: number;

    createdAt: number;
    lastUpdate?: number;

    categories: string[];
    mainImage: string;
    ownerId: string;
}

export const productListTransformer: ResponseTransformer<
    Product[],
    ProductListResponseModel[]
> = (data: Product[]) => {
    return data.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        published: product.published,
        publicationChangedAt: product.publicationChangedAt,
        createdAt: product.createdAt,
        lastUpdate: product.lastUpdate,
        categories: product.categoryIds,
        ownerId: product.ownerId,
        mainImage: product.images[0],
    }));
};
