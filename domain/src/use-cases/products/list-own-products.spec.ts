import { createTestingContext } from "../../testing-utils/default-testing-context.js";
import { createValidProduct } from "../../testing-utils/product-fakers.js";
import { createValidUser } from "../../testing-utils/user-fakers.js";
import { QueryResponse } from "../../utils/query-response.js";
import { ListOwnProductsUseCase } from "./list-own-products.js";

describe("List Owned Products", () => {
    test("given a user without products it should return an empty array", async () => {
        //given
        const context = createTestingContext();
        const currentUser = createValidUser();

        const otherUser = createValidUser();
        context.products.addProducts([
            createValidProduct(otherUser.id),
            createValidProduct(otherUser.id),
            createValidProduct(otherUser.id),
        ]);

        //when
        const response = await ListOwnProductsUseCase(
            {},
            {
                ...context,
                currentUser,
            }
        );

        //then
        if (QueryResponse.isFailure(response)) {
            throw new Error("Should not fail");
        }
        const products = response.data;
        expect(products).toEqual([]);
    });

    test("given a user with products it should return an array with the products", async () => {
        //given
        const context = createTestingContext();
        const currentUser = createValidUser();

        const otherUser = createValidUser();
        context.products.addProducts([
            createValidProduct(otherUser.id),
            createValidProduct(otherUser.id),
            createValidProduct(otherUser.id),
        ]);
        context.products.addProducts([
            createValidProduct(currentUser.id),
            createValidProduct(currentUser.id),
        ]);

        //when
        const response = await ListOwnProductsUseCase(
            {},
            {
                ...context,
                currentUser,
            }
        );

        //then
        if (QueryResponse.isFailure(response)) {
            throw new Error("Should not fail");
        }
        const products = response.data;
        expect(products).toHaveLength(2);
        expect(
            products.every((product) => product.ownerId === currentUser.id)
        ).toBe(true);
        expect(
            products.some((product) => product.ownerId === otherUser.id)
        ).toBe(false);
    });
});
