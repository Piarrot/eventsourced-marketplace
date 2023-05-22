import { StoryDefault } from "@ladle/react";
import { container } from "../container.ts";
import { products } from "../testing-utils/products-data.ts";
import { Offers } from "./offers.tsx";
import { StoryPadding } from "../testing-utils/story-utils.tsx";

export default {
    decorators: [StoryPadding],
} satisfies StoryDefault;

export const FetchingOffers = () => {
    container.register("endpointFetcher", {
        getOffers: () => new Promise(() => {}),
    });
    return <Offers />;
};

export const EmptyOffers = () => {
    container.register("endpointFetcher", {
        getOffers: () => Promise.resolve([]),
    });
    return <Offers />;
};
export const ResolvedOffers = () => {
    container.register("endpointFetcher", {
        getOffers: () => Promise.resolve(products),
    });
    return <Offers />;
};
