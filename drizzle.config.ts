import { defineConfig } from "drizzle-kit";
import { LocalDatabase, MigrationsFolder } from "./src/Database";

export default defineConfig({
    dialect: "sqlite",
    schema: [
        "./src/**/*Schema.ts",
    ],
    out: MigrationsFolder,
    dbCredentials: {
        url: LocalDatabase
    }
});