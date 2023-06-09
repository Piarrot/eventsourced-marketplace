import { IProductsProvider, IProductsStore, Product } from "marketplace-domain";

export class ProductsProvider implements IProductsProvider, IProductsStore {
    private products: Record<string, Product> = {};

    getProductsByOwner(ownerId: string): Promise<Product[]> {
        return Promise.resolve(
            Object.values(this.products).filter(
                (product) => product.ownerId === ownerId
            )
        );
    }
    getById(id: string): Promise<Product | undefined> {
        return Promise.resolve(this.products[id]);
    }
    create(product: Product): Promise<void> {
        this.products[product.id] = product;
        return Promise.resolve();
    }
    getAll(): Promise<Product[]> {
        return Promise.resolve(Object.values(this.products));
    }
    update(
        productId: string,
        productMutation: Partial<Omit<Product, "id">>
    ): Promise<void> {
        const product = this.products[productId];
        if (!product) {
            return Promise.reject(new Error("Product not found"));
        }
        this.products[productId] = { ...product, ...productMutation };
        return Promise.resolve();
    }
}
