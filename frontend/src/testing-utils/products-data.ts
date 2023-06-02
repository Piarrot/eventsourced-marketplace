import { ProductListResponseModel } from "marketplace-domain";

export const products: Array<ProductListResponseModel> = Array.from(
    { length: 10 },
    (_, i) => ({
        id: `${i}`,
        name: `Product ${i}`,
        description: `Description ${i}`,
        price: Math.random() * 1000,
        mainImage: `https://picsum.photos/seed/${i}/300/200`,
        categories: [],
        createdAt: Date.now(),
        discount: Math.floor(Math.random() * 99),
        ownerId: `${i}`,
        published: true,
        lastUpdate: Date.now(),
        publicationChangedAt: Date.now(),
    })
);
