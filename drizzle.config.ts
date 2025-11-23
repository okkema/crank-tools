import { defineConfig } from "drizzle-kit";
import { LocalDatabase, MigrationsFolder } from "./src/Database";

export default defineConfig({
    dialect: "sqlite",
    schema: [
        "./src/schema.ts",
    ],
    out: MigrationsFolder,
    dbCredentials: {
        url: LocalDatabase
    }
});