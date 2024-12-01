import { defineConfig } from "vite";

export default defineConfig({
    base: "/2dgame-portfolio",
    build: {
        minify: "terser",
    },
})