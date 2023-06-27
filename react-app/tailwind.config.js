/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                sm: "576px",
                md: "768px",
                lg: "992px",
                xl: "1200px",
                xxl: "1400px",
            },
            colors: {
                dark: "#1f1f1f",
                primary: "#0E8388",
                smoke: "#6c757d",
                lightenDark: "#313131",
            },

            backgroundColor: {
                dark: "#1f1f1f",
                primary: "#0E8388",
                lightenDark: "#313131",
                darkWhite: "#f0f2f5",
            },
        },
    },
    plugins: [],
};
