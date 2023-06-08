import { UserResponseModel } from "marketplace-domain";
import { createContext } from "react";

export interface IAuthContext {
    currentUser: UserResponseModel | null;
    setCurrentUser(user: UserResponseModel): void;
}

export const AuthContext = createContext<IAuthContext>({
    currentUser: null,
    setCurrentUser: () => {},
});

export const AuthProvider = AuthContext.Provider;
