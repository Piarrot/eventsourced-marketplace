import { useContext, useEffect, useState } from "react";
import { ProductListResponseModel } from "marketplace-domain";
import { Spinner } from "./spinner.js";
import { ProductList } from "./product-list.js";
import { FetchContext } from "../contexts/fetch-context.js";

export function Offers() {
    const [offers, setOffers] = useState<ProductListResponseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetcher = useContext(FetchContext);

    useEffect(() => {
        fetcher.getOffers().then((offers) => {
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
