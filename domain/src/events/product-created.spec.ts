import { getDefaultContext } from "../testing-utils/default-testing-context";
import { ApplyProductCreated, ProductCreatedEvent } from "./product-created";

describe("Product Created Event", () => {
    test("Given a Created Event should store a new product", async () => {
        //given
        const event: ProductCreatedEvent = {
            type: "product-created",
            userId: "user-id",
            timestamp: Date.now(),
            payload: {
                id: "product-id",
                name: "product-name",
                price: 100,
                discount: 10,
                description: "product-description",
                images: [],
                categoryIds: [],
            },
        };

        const context = getDefaultContext();

        //when
        await ApplyProductCreated(event, context);

        //then
        const products = await context.products.getProductsByOwner("user-id");
        expect(products).toHaveLength(1);
        expect(products[0].id).toBe("product-id");
    });
});
