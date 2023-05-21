import { ProductListResponseModel } from "marketplace-domain";
import { ProductCard } from "./product-card.tsx";

interface ProductListProps {
    products: ProductListResponseModel[];
}

export function ProductList({ products }: ProductListProps) {
    return (
        <section>
            {products.map((product) => {
                return <ProductCard product={product} />;
            })}
        </section>
    );
}
