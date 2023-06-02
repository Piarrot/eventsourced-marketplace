import { useCurrentUser } from "../../hooks/use-current-user.js";
import { Avatar } from "../avatar.js";
import { ClearButton } from "../common/buttons/clear-button.js";
import { Icon } from "../common/icons/icon.js";

export function FooterUserArea() {
    const currentUser = useCurrentUser();
    return (
        <div>
            {currentUser ? (
                <>
                    <ClearButton>
                        <Avatar src={currentUser.profilePicture} size="42px" />
                        {/* <span>Perfil</span> */}
                    </ClearButton>
                </>
            ) : (
                <ClearButton>
                    <Icon className="fa-sign-in-alt" size="20px" />
                    <span>Ingresar</span>
                </ClearButton>
            )}
        </div>
    );
}
