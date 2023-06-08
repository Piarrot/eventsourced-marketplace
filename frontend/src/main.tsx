import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { products } from "./testing-utils/products-data.js";
import { AuthProvider } from "./contexts/auth-context.js";
import { FetchProvider } from "./contexts/fetch-context.js";
import { AuthContextImpl } from "./contexts/impl/auth-service.js";

const authContext = new AuthContextImpl();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <FetchProvider
            value={{
                getOffers: () => Promise.resolve(products),
            }}
        >
            <AuthProvider value={authContext}>
                <App />
            </AuthProvider>
        </FetchProvider>
    </React.StrictMode>
);
