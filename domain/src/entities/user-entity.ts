export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    hashedPassword: string;
    registeredAt: number;
    lastUpdate: number;

    cart?: Cart;
}

export interface Cart {
    products: [
        {
            productId: string;
            quantity: number;
        }
    ];
    fullPrice: number;
}
