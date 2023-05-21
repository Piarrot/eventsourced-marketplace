import { Theme } from "../contexts/theme.tsx";

export function Footer() {
    return (
        <footer
            style={{
                width: "100%",
                height: "100px",
                backgroundColor: Theme.colors.accent[20],
            }}
        >
            <h2>Footer</h2>
        </footer>
    );
}
