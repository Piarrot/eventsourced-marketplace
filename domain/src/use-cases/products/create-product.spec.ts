import { ProductCreatedEventType } from "../../events/product-created";
import { getDefaultContext } from "../../testing-utils/default-testing-context";
import { createValidUser } from "../../testing-utils/user-fakers";
import { CreateProduct } from "./create-product";

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
        const context = getDefaultContext();
        const currentUser = createValidUser();

        //when
        const result = await CreateProduct(payload, {
            ...context,
            currentUser,
        });

        //then
        expect(result.productId).toBeDefined();
        expect(
            context.eventStore.getEventStream(ProductCreatedEventType)[0]
        ).toEqual({
            type: ProductCreatedEventType,
            userId: currentUser.id,
            timestamp: context.time.currentTimestamp(),
            payload: {
                id: result.productId,
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
