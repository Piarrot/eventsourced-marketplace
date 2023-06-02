import { ProductListResponseModel } from "marketplace-domain";
import { ProductPrice } from "./product-price.tsx";

export const CardWidth = "200px";

interface ProductCardProps {
    product: ProductListResponseModel;
}
export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="hover:shadow-card flex cursor-pointer flex-col items-stretch rounded-md border border-solid border-gray-600">
            <div className="bg-gray mb-4 flex aspect-square items-center justify-center">
                <img
                    style={{
                        maxWidth: "100%",
                    }}
                    src={product.mainImage}
                    alt={product.name}
                />
            </div>
            <div className="px-4">
                <h3 style={{ width: "100%", fontSize: "1em" }}>
                    {product.name}
                </h3>
                <ProductPrice
                    price={product.price}
                    discount={product.discount}
                />
            </div>
        </div>
    );
}
