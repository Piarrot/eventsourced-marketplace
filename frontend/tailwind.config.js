import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.tsx"],
    theme: {
        colors: {
            primary: "#2e4057",
            accent: "#ff7777",
            success: "#2cb000",
            gray: "#e2e2e2",
            white: "#ffffff",
            black: "#000000",
        },
        extend: {
            fontFamily: {
                sans: ["Montserrat", "sans-serif"],
            },
            boxShadow: {
                card: "0 0 5px 0 rgba(0, 0, 0, 0.8)",
            },
        },
    },
    plugins: [],
};
