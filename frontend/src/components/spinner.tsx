import { Icon } from "./common/icons/icon.tsx";

export function Spinner() {
    return (
        <Icon
            className="fa-circle-notch fa-spin"
            style={
                {
                    fontSize: "2em",
                    "--fa-animation-duration": "1s",
                } as any
            }
        />
    );
}
