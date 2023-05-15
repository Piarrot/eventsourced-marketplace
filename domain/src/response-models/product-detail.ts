import { ProductDetailOwnerResponseModel } from "./product-detail-owner";

export interface ProductDetailResponseModel {
    id: string;
    name: string;
    description: string;

    price: number;
    discount: number;

    owner: ProductDetailOwnerResponseModel;
}
