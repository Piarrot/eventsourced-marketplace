import { ProductListResponseModel } from "marketplace-domain";

interface ProductProps {
    product: ProductListResponseModel;
}
export function Product({ product }: ProductProps) {
    return (
        <article>
            <img src={product.mainImage} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
        </article>
    );
}
