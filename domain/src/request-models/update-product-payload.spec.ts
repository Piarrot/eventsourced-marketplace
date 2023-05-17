import { parseUpdateProductPayload } from ".";
import { ResultRecord } from "..";

describe("Parse UpdateProductPayload", () => {
    test("given a valid payload, should parse without errors", () => {
        //given
        const payload = {
            id: "id",
            name: "name",
            price: 1,
            discount: 1,
            description: "description",
            images: ["image"],
            categoryIds: ["categoryId"],
        };

        //when
        const result = parseUpdateProductPayload(payload);

        //then
        if (ResultRecord.isFailure(result)) {
            console.log(result);
            throw new Error("Parsing should be success");
        }

        expect(result.values).toEqual({
            id: "id",
            name: "name",
            price: 1,
            discount: 1,
            description: "description",
            images: ["image"],
            categoryIds: ["categoryId"],
        });
    });

    test("given an empty payload, should parse with errors", () => {
        //given
        const payload = {};

        //when
        const result = parseUpdateProductPayload(payload);

        //then
        if (ResultRecord.isSuccess(result)) {
            throw new Error("Parsing should not be success");
        }

        expect(result.errors).toEqual({
            id: "SHOULD_BE_STRING",
        });
        expect(result.values).toEqual({});
    });

    test("given a partial payload, should parse without errors", () => {
        //given
        const payload = {
            id: "id",
            name: "name",
            price: 1,
        };

        //when
        const result = parseUpdateProductPayload(payload);

        //then
        if (ResultRecord.isFailure(result)) {
            console.log(result);
            throw new Error("Parsing should be success");
        }

        expect(result.values).toEqual({
            id: "id",
            name: "name",
            price: 1,
        });
    });
});
