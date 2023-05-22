import { ProductListResponseModel } from "marketplace-domain";

export interface IEndpointFetcher {
    getOffers(): Promise<ProductListResponseModel[]>;
}
