import { container } from "../container.ts";
import { IAuthServiceProvider } from "../providers/auth-service.ts";
import { products } from "../testing-utils/products-data.ts";
import { currentUser } from "../testing-utils/users-data.ts";
import { Home } from "./home.tsx";
import { Observable } from "@ulthar/typey";
import { UserResponseModel } from "marketplace-domain";

export const HomePage = () => {
    container.register("endpointFetcher", {
        getOffers: () => Promise.resolve(products),
    });
    container.register("authServiceProvider", {
        currentUser: () => {
            return {
                subscribe(cb: (user: UserResponseModel) => void) {
                    cb(currentUser);
                },
            } as Observable<UserResponseModel>;
        },
    } as IAuthServiceProvider);
    return <Home />;
};
