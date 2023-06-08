import type { StoryDefault } from "@ladle/react";
import { ProductListResponseModel } from "marketplace-domain";
import { products } from "../testing-utils/products-data.js";
import { StoryWithPadding } from "../testing-utils/story-utils.js";
import { ProductCard } from "./product-card.js";

const productWithoutDiscount = {
    ...products[0],
    discount: 0,
};

const productWithDiscount: ProductListResponseModel = {
    ...productWithoutDiscount,
    discount: 10,
};

export default {
    decorators: [StoryWithPadding],
} satisfies StoryDefault;

export const BasicProductCard = () => (
    <ProductCard product={productWithoutDiscount} />
);

export const ProductWithDiscount = () => (
    <ProductCard product={productWithDiscount} />
);
