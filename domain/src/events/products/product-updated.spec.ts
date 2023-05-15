import { EVENTS } from "..";
import { createTestingContext } from "../../testing-utils/default-testing-context";
import { createValidProduct } from "../../testing-utils/product-fakers";
import { createValidUser } from "../../testing-utils/user-fakers";
import { ApplyProductUpdated } from "./product-updated";

describe("Product Updated Event", () => {
    test("Given a valid payload should update it", async () => {
        // given
        const currentUser = createValidUser();
        const product = createValidProduct(currentUser.id);
        const event = {
            type: EVENTS.PRODUCT_UPDATED,
            userId: currentUser.id,
            productId: product.id,
            timestamp: 123,
            payload: {
                name: "new name",
                price: 100,
            },
        };
        const context = createTestingContext();
        context.products.addProducts([product]);

        // when
        await ApplyProductUpdated(event, context);

        // then
        expect(await context.products.getById(product.id)).toEqual({
            ...product,
            ...event.payload,
            lastUpdate: event.timestamp,
        });
    });
});
