import { calculatePriceWithDiscount } from "./price";

describe("Price", () => {
    test("given a price and a discount, it should apply it correctly", () => {
        // given
        const price = 10;
        const discount = 10;
        const expectedPrice = 9;

        // when
        const calculatedPrice = calculatePriceWithDiscount(price, discount);

        // then
        expect(calculatedPrice).toBe(expectedPrice);
    });
});
