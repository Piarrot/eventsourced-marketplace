import { ProductDetailOwnerViewModel } from "./product-detail-owner";

export interface ProductDetailViewModel {
    id: string;
    name: string;
    description: string;

    price: number;
    discount: number;

    owner: ProductDetailOwnerViewModel;
}
