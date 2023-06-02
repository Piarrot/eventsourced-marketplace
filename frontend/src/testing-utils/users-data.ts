import { UserResponseModel } from "marketplace-domain";

export const currentUser: UserResponseModel = {
    id: "1",
    name: "John Doe",
    email: "johndoe@email.com",
    profilePicture: "https://picsum.photos/200/300",
    registeredAt: Date.now(),
    lastUpdate: Date.now(),
};
