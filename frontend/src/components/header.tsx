import { Theme } from "../contexts/theme.tsx";

export function Header() {
    return (
        <header
            style={{
                width: "100%",
                height: "100px",
                backgroundColor: Theme.colors.accent[100],
            }}
        >
            <h2>Header</h2>
        </header>
    );
}
