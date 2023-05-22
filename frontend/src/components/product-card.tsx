import { ProductListResponseModel } from "marketplace-domain";
import { ProductPrice } from "./product-price.tsx";
import { styled } from "styled-components";

export const CardWidth = "160px";

const CardContainer = styled.article({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 1rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: CardWidth,
    overflow: "hidden",
    boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
    "&:hover": {
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.8)",
        cursor: "pointer",
    },
});

const ImageContainer = styled.div({
    width: CardWidth,
    height: CardWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--gray)",
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
            <h3 style={{ width: "100%", fontSize: "1em" }}>{product.name}</h3>
            <ProductPrice price={product.price} discount={product.discount} />
        </CardContainer>
    );
}
