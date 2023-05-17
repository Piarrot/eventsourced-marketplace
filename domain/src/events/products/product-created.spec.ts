import { createTestingContext } from "../../testing-utils/default-testing-context.js";
import { ApplyProductCreated, ProductCreatedEvent } from "./product-created.js";
import { PRODUCT_EVENTS } from "./product-events.js";

describe("Product Created Event", () => {
    test("Given a Created Event should store a new product", async () => {
        //given
        const event: ProductCreatedEvent = {
            type: PRODUCT_EVENTS.PRODUCT_CREATED,
            userId: "user-id",
            timestamp: Date.now(),
            productId: "product-id",
            payload: {
                name: "product-name",
                price: 100,
                discount: 10,
                description: "product-description",
                images: [],
                categoryIds: [],
            },
        };

        const context = createTestingContext();

        //when
        await ApplyProductCreated(event, context);

        //then
        const products = await context.products.getProductsByOwner("user-id");
        expect(products).toHaveLength(1);
        expect(products[0].id).toBe("product-id");
    });
});
