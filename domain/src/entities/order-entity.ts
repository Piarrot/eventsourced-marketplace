export interface Order {
    id: string;
    userId: string;
    products: {
        productId: string;
        quantity: number;
        price: number;
    };
    createdAt: number;

    status: "pending" | "processing" | "completed" | "cancelled";
    lastStatusChange: number;
}
