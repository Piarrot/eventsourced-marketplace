import { ProductListResponseModel } from "marketplace-domain";
import { createContext } from "react";

export interface IFetchContext {
    getOffers(): Promise<ProductListResponseModel[]>;
}

export const FetchContext = createContext<IFetchContext>({
    getOffers: () => Promise.resolve([]),
});

export const FetchProvider = FetchContext.Provider;
