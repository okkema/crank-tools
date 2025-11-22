import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: [
        "./src/**/*Schema.ts",
    ],
    out: "./migrations",
});