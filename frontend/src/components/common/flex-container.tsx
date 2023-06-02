import { PropsWithChildren } from "react";

type Props = {
    direction?: "row" | "column";
    align?: "center" | "flex-start" | "flex-end";
    justify?: "center" | "flex-start" | "flex-end";
    gap?: string;
};
export const FlexContainer = ({
    direction,
    align,
    justify,
    gap,
    children,
}: PropsWithChildren<Props>) => {
    return (
        <div
            className="flex"
            style={{
                display: "flex",
                flexDirection: direction || "row",
                alignItems: align || "center",
                justifyContent: justify || "flex-start",
                gap: gap || "0px",
            }}
        >
            {children}
        </div>
    );
};
