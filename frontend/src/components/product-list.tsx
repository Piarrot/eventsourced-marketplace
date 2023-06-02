import { ProductListResponseModel } from "marketplace-domain";
import { ProductCard } from "./product-card.tsx";

type Props = {
    products: ProductListResponseModel[];
};

export function ProductList({ products }: Props) {
    return (
        <div className="grid grid-cols-2 justify-items-center gap-4 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
            })}
        </div>
    );
}
