import { DOMAIN_ERRORS } from "../../errors";
import { PRODUCT_EVENTS } from "../../events/products/product-events";
import { createTestingContext } from "../../testing-utils/default-testing-context";
import { createValidProduct } from "../../testing-utils/product-fakers";
import { createValidUser } from "../../testing-utils/user-fakers";
import { CommandResponse } from "../../utils/command-response";
import { UpdateProductUseCase } from "./update-product";

describe("Update Product Use Case", () => {
    test("Given a valid payload should update it", async () => {
        // given
        const currentUser = createValidUser();
        const product = createValidProduct(currentUser.id);
        const context = createTestingContext();
        const payload = {
            id: product.id,
            price: 100,
            name: "new name",
        };
        context.products.addProducts([product]);

        // when
        const result = await UpdateProductUseCase(payload, {
            currentUser,
            ...context,
        });

        // then
        if (CommandResponse.isFailure(result)) {
            throw new Error(result.error);
        }

        expect(
            context.eventStore.getEventStream(PRODUCT_EVENTS.PRODUCT_UPDATED)[0]
        ).toEqual({
            type: PRODUCT_EVENTS.PRODUCT_UPDATED,
            userId: currentUser.id,
            productId: product.id,
            payload: {
                price: payload.price,
                name: payload.name,
            },
            timestamp: context.time.currentTimestamp(),
        });
    });

    test("Given a payload with product owner different from current user should return permission denied error", async () => {
        // given
        const currentUser = createValidUser();
        const product = createValidProduct("another-user-id");
        const payload = {
            id: product.id,
            price: 100,
            name: "new name",
        };
        const context = createTestingContext();
        context.products.addProducts([product]);

        // when
        const result = await UpdateProductUseCase(payload, {
            currentUser,
            ...context,
        });

        // then

        if (CommandResponse.isSuccess(result)) {
            throw new Error("Should not be success");
        }
        expect(result.error).toBe("PERMISSION_DENIED");
    });

    test("Given a payload with invalid product id should return invalid product error", async () => {
        // given
        const currentUser = createValidUser();
        const payload = {
            id: "invalid-product-id",
            price: 100,
            name: "new name",
        };
        const context = createTestingContext();

        // when
        const result = await UpdateProductUseCase(payload, {
            currentUser,
            ...context,
        });

        // then
        if (CommandResponse.isSuccess(result)) {
            throw new Error("Should not be success");
        }
        expect(result.error).toBe(DOMAIN_ERRORS.INVALID_PRODUCT);
    });
});
