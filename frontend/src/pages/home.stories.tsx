import { products } from "../testing-utils/products-data.ts";
import { withAuthMock, withFetchMock } from "../testing-utils/story-utils.tsx";
import { currentUser } from "../testing-utils/users-data.ts";
import { Home } from "./home.tsx";

export const HomePage = () => {
    return withFetchMock(
        {
            getOffers: () => Promise.resolve(products),
        },
        withAuthMock(
            {
                currentUser,
            },
            <Home />
        )
    );
};
