export function calculatePriceWithDiscount(
    price: number,
    discount: number
): number {
    return price * (1 - discount / 100);
}
