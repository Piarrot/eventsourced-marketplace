import styled from "styled-components";

type Props = {
    direction?: "row" | "column";
    align?: "center" | "flex-start" | "flex-end";
    justify?: "center" | "flex-start" | "flex-end";
};
export const FlexContainer = styled.div<Props>((props: Props) => ({
    display: "flex",
    flexDirection: props.direction || "row",
    alignItems: props.align || "center",
    justifyContent: props.justify || "flex-start",
}));
