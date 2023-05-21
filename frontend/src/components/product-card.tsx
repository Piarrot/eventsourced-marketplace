import { ProductListResponseModel } from "marketplace-domain";
import { ProductPrice } from "./product-price.tsx";
import { styled } from "styled-components";

const CardContainer = styled.article({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 1rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "200px",
    overflow: "hidden",
    "&:hover": {
        boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
        cursor: "pointer",
    },
});

const ImageContainer = styled.div({
    width: "200px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--primary-400)",
    marginBottom: "1rem",
});

interface ProductCardProps {
    product: ProductListResponseModel;
}
export function ProductCard({ product }: ProductCardProps) {
    return (
        <CardContainer>
            <ImageContainer>
                <img
                    style={{
                        maxWidth: "100%",
                    }}
                    src={product.mainImage}
                    alt={product.name}
                />
            </ImageContainer>
            <h3>{product.name}</h3>
            <ProductPrice price={product.price} discount={product.discount} />
        </CardContainer>
    );
}
