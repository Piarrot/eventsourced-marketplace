import { ProductListResponseModel } from "marketplace-domain";
import { ProductCard } from "./product-card.js";

const productWithoutDiscount = {
    ...products[0],
    discount: 0,
};

const productWithDiscount: ProductListResponseModel = {
    ...productWithoutDiscount,
    discount: 10,
};

import type { StoryDefault } from "@ladle/react";
import { StoryPadding } from "../testing-utils/story-utils.js";
import { products } from "../testing-utils/products-data.js";

export default {
    decorators: [StoryPadding],
} satisfies StoryDefault;

export const BasicProductCard = () => (
    <ProductCard product={productWithoutDiscount} />
);

export const ProductWithDiscount = () => (
    <ProductCard product={productWithDiscount} />
);
