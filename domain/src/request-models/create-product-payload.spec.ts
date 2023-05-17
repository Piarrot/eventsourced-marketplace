import { parseCreateProductPayload } from ".";
import { ParsingError, ResultRecord } from "..";

describe("Parse CreateProductPayload", () => {
    test("given a valid payload, should parse without errors", () => {
        //given
        const payload = {
            name: "name",
            price: 100,
            discount: 10,
            description: "description",
            images: ["image1", "image2"],
            categoryIds: ["category1", "category2"],
        };

        //when
        const result = parseCreateProductPayload(payload);

        //then
        if (!ResultRecord.isSuccess(result)) {
            throw new Error("Parsing should be success");
        }

        expect(result.values).toEqual({
            name: "name",
            price: 100,
            discount: 10,
            description: "description",
            images: ["image1", "image2"],
            categoryIds: ["category1", "category2"],
        });
    });

    test("given an empty string, should parse with errors", () => {
        //given
        const payload = {};

        //when
        const result = parseCreateProductPayload(payload);

        //then
        if (ResultRecord.isSuccess(result)) {
            throw new Error("Parsing should not be success");
        }

        expect(result.errors).toEqual({
            name: ParsingError.SHOULD_BE_STRING,
            price: ParsingError.SHOULD_BE_NUMBER,
            discount: ParsingError.SHOULD_BE_NUMBER,
            description: ParsingError.SHOULD_BE_STRING,
            images: ParsingError.SHOULD_BE_ARRAY,
            categoryIds: ParsingError.SHOULD_BE_ARRAY,
        });
        expect(result.values).toEqual({});
    });

    test("Given a partially valid payload, should parse with errors", () => {
        //given
        const payload = {
            name: "name",
            price: 100,
            discount: 10,
            images: [],
            categoryIds: ["category1", "category2"],
        };

        //when
        const result = parseCreateProductPayload(payload);

        //then
        if (ResultRecord.isSuccess(result)) {
            throw new Error("Parsing should not be success");
        }

        expect(result.errors).toEqual({
            description: ParsingError.SHOULD_BE_STRING,
            images: ParsingError.ARRAY_LESS_THAN_MIN,
        });
        expect(result.values).toEqual({
            name: "name",
            price: 100,
            discount: 10,
            categoryIds: ["category1", "category2"],
        });
    });
});
