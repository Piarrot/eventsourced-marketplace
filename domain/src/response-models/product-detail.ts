export interface ProductDetailResponseModel {
    id: string;
    name: string;
    description: string;

    price: number;
    discount: number;

    owner: ProductDetailOwnerResponseModel;
}

export interface ProductDetailOwnerResponseModel {
    id: string;
    name: string;
    profilePicture: string;
}
