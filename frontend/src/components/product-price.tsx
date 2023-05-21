import { calculatePriceWithDiscount } from "marketplace-domain";
import styled from "styled-components";
import { FlexContainer } from "../utils/components.tsx";

type Props = {
    price: number;
    discount: number;
};

const PriceContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    minHeight: "4rem",
    width: "100%",
    justifyContent: "flex-end",
});

const CrossedOutPrice = styled.span({
    textDecoration: "line-through",
    color: "var(--primary-200)",
});

const Discount = styled.span({
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "var(--accent-900)",
});

const RealPrice = styled.span({
    fontWeight: "bold",
    fontSize: "1.5rem",
});

export function ProductPrice({ price, discount }: Props) {
    const finalPriceStr = calculatePriceWithDiscount(
        price,
        discount
    ).toLocaleString();

    const priceStr = price.toLocaleString();

    if (discount === 0) {
        return (
            <PriceContainer>
                <RealPrice>$ {priceStr}</RealPrice>
            </PriceContainer>
        );
    }

    return (
        <PriceContainer>
            <CrossedOutPrice>$ {priceStr}</CrossedOutPrice>
            <FlexContainer align="center" justify="flex-start">
                <RealPrice
                    style={{
                        paddingRight: "5px",
                    }}
                >
                    $ {finalPriceStr}
                </RealPrice>
                <Discount>{discount}% OFF</Discount>
            </FlexContainer>
        </PriceContainer>
    );
}
