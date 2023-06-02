import { calculatePriceWithDiscount } from "marketplace-domain";
import { PropsWithChildren } from "react";

type Props = {
    price: number;
    discount: number;
};

const PriceContainer = ({ children }: PropsWithChildren) => {
    return <div className="flex flex-col justify-end">{children}</div>;
};
const RealPrice = ({ children }: PropsWithChildren) => {
    return <span className="text-lg font-bold">{children}</span>;
};

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
            <span className="text-gray-500 line-through">$ {priceStr}</span>
            <div className="flex items-center justify-start gap-4">
                <RealPrice>$ {finalPriceStr}</RealPrice>
                <span className="text-success text-sm font-bold">
                    {discount}% OFF
                </span>
            </div>
        </PriceContainer>
    );
}
