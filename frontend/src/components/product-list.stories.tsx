import { ProductList } from "./product-list.tsx";
import { products } from "../testing-utils/products-data.ts";

export const BasicProductList = () => <ProductList products={products} />;
