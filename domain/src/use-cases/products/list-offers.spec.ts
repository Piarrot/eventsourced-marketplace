import { createTestingContext } from "../../testing-utils/default-testing-context.js";
import { createValidProduct } from "../../testing-utils/product-fakers.js";
import { createValidUser } from "../../testing-utils/user-fakers.js";
import { QueryResponse } from "../../utils/query-response.js";
import { ListOffersUseCase } from "./list-offers.js";

describe("List Offers", () => {
    test("List all products that are discounted, sorted by discount percentage", async () => {
        // given
        const context = createTestingContext();
        const user = createValidUser();
        const products = [
            createValidProduct(user.id, { discount: 10 }),
            createValidProduct(user.id, { discount: 20 }),
            createValidProduct(user.id, { discount: 5 }),
            createValidProduct(user.id, { discount: 15 }),
            createValidProduct(user.id, { discount: 0 }),
            createValidProduct(user.id, { discount: 0 }),
            createValidProduct(user.id, { discount: 0 }),
        ];
        context.products.addProducts(products);
        // when
        const response = await ListOffersUseCase({}, { ...context });
        // then
        if (QueryResponse.isFailure(response)) {
            throw new Error("Should not fail");
        }
        expect(response.data).toEqual(
            products
                .filter((p) => p.discount > 0)
                .sort((a, b) => b.discount - a.discount)
        );
    });
});
