import { ProductListResponseModel } from "marketplace-domain";
import { ProductCard } from "./product-card.js";

const productWithoutDiscount: ProductListResponseModel = {
    id: "1",
    name: "Product 1",
    price: 100,
    mainImage: "https://via.placeholder.com/350x250",
    description: "Product 1 description",
    categories: ["Category 1", "Category 2"],
    ownerId: "1",
    discount: 0,
    createdAt: Date.now(),
    published: true,
};

const productWithDiscount: ProductListResponseModel = {
    ...productWithoutDiscount,
    discount: 10,
};

export const BasicProductCard = () => (
    <ProductCard product={productWithoutDiscount} />
);

export const ProductWithDiscount = () => (
    <ProductCard product={productWithDiscount} />
);
