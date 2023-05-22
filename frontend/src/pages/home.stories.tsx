import { container } from "../container.ts";
import { products } from "../testing-utils/products-data.ts";
import { Home } from "./home.tsx";

export const HomePage = () => {
    container.register("endpointFetcher", {
        getOffers: () => Promise.resolve(products),
    });
    return <Home />;
};
