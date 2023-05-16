export interface UpdateProductPayload {
    id: string;
    name?: string;
    price?: number;
    discount?: number;
    description?: string;
    images?: string[];
    categoryIds?: string[];
}
