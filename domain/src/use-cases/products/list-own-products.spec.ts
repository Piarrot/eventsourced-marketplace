import { getDefaultContext } from "../../testing-utils/default-testing-context";
import { createValidProduct } from "../../testing-utils/product-fakers";
import { createValidUser } from "../../testing-utils/user-fakers";
import { ListOwnProducts } from "./list-own-products";

describe("List Owned Products", () => {
    test("given a user without products it should return an empty array", async () => {
        //given
        const context = getDefaultContext();
        const currentUser = createValidUser();

        const otherUser = createValidUser();
        context.products.addProducts([
            createValidProduct(otherUser.id),
            createValidProduct(otherUser.id),
            createValidProduct(otherUser.id),
        ]);

        //when
        const products = await ListOwnProducts({
            ...context,
            currentUser,
        });

        //then
        expect(products).toEqual([]);
    });

    test("given a user with products it should return an array with the products", async () => {
        //given
        const context = getDefaultContext();
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
        const products = await ListOwnProducts({
            ...context,
            currentUser,
        });

        //then
        expect(products).toHaveLength(2);
        expect(
            products.every((product) => product.ownerId === currentUser.id)
        ).toBe(true);
        expect(
            products.some((product) => product.ownerId === otherUser.id)
        ).toBe(false);
    });
});
