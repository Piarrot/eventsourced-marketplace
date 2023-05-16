export interface CreateProductPayload {
    name: string;
    price: number;
    discount: number;
    description: string;
    images: string[];
    categoryIds: string[];
}
