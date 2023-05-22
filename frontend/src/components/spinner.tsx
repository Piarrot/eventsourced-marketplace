import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Spinner() {
    return (
        <FontAwesomeIcon
            icon={faCircleNotch}
            spin
            style={
                {
                    fontSize: "2em",
                    "--fa-animation-duration": "1s",
                } as any
            }
        />
    );
}
