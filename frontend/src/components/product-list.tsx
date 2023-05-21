import { ProductListResponseModel } from "marketplace-domain";
import { Product } from "./product.tsx";

interface ProductListProps {
    products: ProductListResponseModel[];
}

export function ProductList({ products }: ProductListProps) {
    return (
        <section>
            {products.map((product) => {
                return <Product product={product} />;
            })}
        </section>
    );
}
