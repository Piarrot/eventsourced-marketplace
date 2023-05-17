import { EVENTS } from "../index.js";
import { createTestingContext } from "../../testing-utils/default-testing-context.js";
import { createValidProduct } from "../../testing-utils/product-fakers.js";
import { ApplyProductPublishedEvent } from "./product-published.js";

describe("ProductPublished", () => {
    test("given a publish event, it should update the product when applying it", async () => {
        //given
        const product = createValidProduct("user-id");
        product.published = false;
        const context = createTestingContext();
        context.products.addProducts([product]);
        const event = {
            type: EVENTS.PRODUCT_PUBLISHED,
            userId: product.ownerId,
            productId: product.id,
            payload: {},
            timestamp: context.time.currentTimestamp(),
        };

        //when
        await ApplyProductPublishedEvent(event, context);

        //then
        expect((await context.products.getById(product.id))!.published).toBe(
            true
        );
    });
});
