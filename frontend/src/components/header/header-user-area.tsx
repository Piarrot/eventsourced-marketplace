import { useCurrentUser } from "../../hooks/use-current-user.js";
import { Avatar } from "../avatar.js";
import { ClearButton } from "../common/buttons/clear-button.js";
import { Icon } from "../common/icons/icon.js";

export function HeaderUserArea() {
    const currentUser = useCurrentUser();

    return (
        <div className="hidden items-center justify-end gap-4 lg:flex">
            {currentUser ? (
                <>
                    <ClearButton>
                        <Avatar src={currentUser.profilePicture} size="32px" />
                        <span>Perfil</span>
                    </ClearButton>
                    <ClearButton>
                        <Icon className="fa-truck-fast" size="20px" />
                        <span>Ordenes</span>
                    </ClearButton>
                </>
            ) : (
                <ClearButton>
                    <Icon className="fa-sign-in-alt" size="20px" />
                    <span>Ingresar</span>
                </ClearButton>
            )}
            <ClearButton>
                <Icon className="fa-shopping-cart" size="20px" />
                <span>Carrito</span>
            </ClearButton>
        </div>
    );
}
