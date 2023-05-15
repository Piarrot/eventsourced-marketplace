export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    hashedPassword: string;
    registeredAt: number;
    lastUpdate?: number;

    cart?: CartProduct[];
}

export interface CartProduct {
    productId: string;
    quantity: number;
}
