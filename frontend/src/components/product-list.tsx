import { ProductListResponseModel } from "marketplace-domain";
import { ProductCard } from "./product-card.tsx";
import styled from "styled-components";

type Props = {
    products: ProductListResponseModel[];
};

const CardFlexContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    column-gap: 20px;
    justify-items: center;
    row-gap: 20px;
    padding: 20px;
`;

export function ProductList({ products }: Props) {
    return (
        <CardFlexContainer>
            {products.map((product) => {
                return <ProductCard product={product} />;
            })}
        </CardFlexContainer>
    );
}
