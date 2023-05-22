import { ProductListResponseModel } from "marketplace-domain";
import { CardWidth, ProductCard } from "./product-card.tsx";
import styled from "styled-components";

type Props = {
    products: ProductListResponseModel[];
};

const CardGridContainer = styled.div({
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${CardWidth}, 1fr))`,
    columnGap: "20px",
    justifyItems: "center",
    rowGap: "20px",
    padding: "20px",
});
export function ProductList({ products }: Props) {
    return (
        <CardGridContainer>
            {products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
            })}
        </CardGridContainer>
    );
}
