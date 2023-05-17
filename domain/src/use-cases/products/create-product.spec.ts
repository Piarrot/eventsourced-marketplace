import { PRODUCT_EVENTS } from "../../events/products/product-events.js";
import { createTestingContext } from "../../testing-utils/default-testing-context.js";
import { createValidUser } from "../../testing-utils/user-fakers.js";
import { CommandResponse } from "../../utils/command-response.js";
import { CreateProductUseCase } from "./create-product.js";

describe("Create Product", () => {
    test("given a valid payload, it should create a product", async () => {
        //given
        const payload = {
            name: "Product Name",
            price: 100,
            discount: 0,
            description: "Product Description",
            images: ["image1", "image2"],
            categoryIds: ["category1", "category2"],
        };
        const context = createTestingContext();
        const currentUser = createValidUser();

        //when
        const result = await CreateProductUseCase(payload, {
            ...context,
            currentUser,
        });

        //then
        if (CommandResponse.isFailure(result)) {
            throw new Error("Should not fail");
        }
        expect(
            context.eventStore.getEventStream(PRODUCT_EVENTS.PRODUCT_CREATED)[0]
        ).toEqual({
            type: PRODUCT_EVENTS.PRODUCT_CREATED,
            userId: currentUser.id,
            timestamp: context.time.currentTimestamp(),
            productId: expect.any(String),
            payload: {
                name: payload.name,
                price: payload.price,
                discount: payload.discount,
                description: payload.description,
                images: payload.images,
                categoryIds: payload.categoryIds,
            },
        });
    });
});
