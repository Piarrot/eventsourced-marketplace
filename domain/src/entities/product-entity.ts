export interface Product {
    id: string;

    name: string;
    description: string;

    price: number;
    discount: number;

    published: boolean;
    publicationChangedAt?: number;

    createdAt: number;
    lastUpdate?: number;

    ownerId: string;
    categoryIds: string[];
    images: string[];
}
