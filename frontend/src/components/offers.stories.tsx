import { StoryDefault } from "@ladle/react";
import { products } from "../testing-utils/products-data.ts";
import { StoryWithPadding } from "../testing-utils/story-utils.tsx";
import { Offers } from "./offers.tsx";
import { FetchProvider } from "../contexts/fetch-context.ts";

export default {
    decorators: [StoryWithPadding],
} satisfies StoryDefault;

export const FetchingOffers = () => {
    return (
        <FetchProvider
            value={{
                getOffers: () => new Promise(() => {}),
            }}
        >
            <Offers />
        </FetchProvider>
    );
};

export const EmptyOffers = () => {
    return (
        <FetchProvider
            value={{
                getOffers: () => Promise.resolve([]),
            }}
        >
            <Offers />
        </FetchProvider>
    );
};
export const ResolvedOffers = () => {
    return (
        <FetchProvider
            value={{
                getOffers: () => Promise.resolve(products),
            }}
        >
            <Offers />
        </FetchProvider>
    );
};
