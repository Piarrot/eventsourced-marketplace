export interface ProductResponseModel {
    id: string;
    name: string;
    price: number;
    discount: number;

    description: string;

    published: boolean;
    publicationChangedAt: number;

    createdAt: number;
    lastUpdate?: number;

    categories: string[];
}
