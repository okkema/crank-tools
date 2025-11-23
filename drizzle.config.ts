import { defineConfig } from "drizzle-kit";
import { LocalDatabase, MigrationsFolder } from "./src/Database";

const [driver, dbCredentials] = (function(environment) {
    switch (environment) {
        case "local":
            return [undefined, { url: LocalDatabase }];
        case "demo":
        default:
            throw new Error(`Unable to process migrations for \"${environment}\"`);
    }
})(process.env.ENVIRONMENT);

export default defineConfig({
    dialect: "sqlite",
    schema: [
        "./src/schema.ts",
    ],
    out: MigrationsFolder,
    driver,
    dbCredentials,
});