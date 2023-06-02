import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { container } from "./container.js";
import { products } from "./testing-utils/products-data.js";
import { AuthServiceProvider } from "./providers/impl/auth-service.js";

container.registerAll({
    authServiceProvider: () => new AuthServiceProvider(),
    endpointFetcher: () => ({
        getOffers: () => Promise.resolve(products),
    }),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
