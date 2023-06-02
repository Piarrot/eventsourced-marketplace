import { useEffect, useState } from "react";
import { container } from "../container.ts";
import { UserResponseModel } from "marketplace-domain";

export function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState<UserResponseModel | null>(
        null
    );

    useEffect(() => {
        container
            .resolve("authServiceProvider")
            .currentUser()
            .subscribe((user) => {
                setCurrentUser(user);
            });
    });

    return currentUser;
}
