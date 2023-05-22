import { calculatePriceWithDiscount } from "marketplace-domain";
import styled from "styled-components";
import { FlexContainer } from "../utils/flex-container.tsx";

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
    color: "var(--gray)",
});

const Discount = styled.span({
    fontWeight: "bold",
    fontSize: "0.8em",
    color: "var(--success)",
});

const RealPrice = styled.span({
    fontWeight: "bold",
    fontSize: "0.9em",
});

export function ProductPrice({ price, discount }: Props) {
    const finalPriceStr = calculatePriceWithDiscount(
        price,
        discount
    ).toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const priceStr = price.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

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
