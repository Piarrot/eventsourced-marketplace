export interface UserResponseModel {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    registeredAt: number;
    lastUpdate?: number;
}
