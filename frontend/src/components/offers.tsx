import { useEffect, useState } from "react";
import { container } from "../container.ts";
import { ProductListResponseModel } from "marketplace-domain";
import { ProductList } from "./product-list.tsx";
import { Spinner } from "./spinner.tsx";

export function Offers() {
    const [offers, setOffers] = useState<ProductListResponseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        container
            .resolve("endpointFetcher")
            .getOffers()
            .then((offers) => {
                setOffers(offers);
                setLoading(false);
            });
    }, []);

    return (
        <section
            style={{
                padding: "1em",
            }}
        >
            <h2
                style={{
                    fontSize: "1.5em",
                    fontWeight: "900",
                }}
            >
                Ofertas para ti
            </h2>
            {loading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "350px",
                        padding: "2em",
                    }}
                >
                    <Spinner />
                </div>
            )}
            {!loading && offers.length > 0 && <ProductList products={offers} />}
            {!loading && offers.length == 0 && (
                <p
                    style={{
                        color: "var(--accent)",
                        fontWeight: "bold",
                        padding: "1em",
                    }}
                >
                    Lo sentimos, no hay ofertas en este momento...
                </p>
            )}
        </section>
    );
}
