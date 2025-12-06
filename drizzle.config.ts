import { defineConfig } from "drizzle-kit";
import { MigrationsFolder } from "./src/Database/DatabaseSchema";

type Driver = undefined | "d1-http";
type Credentials = { url: string; } | { accountId: string; databaseId: string; token: string; }

const [driver, dbCredentials] = (function(environment): [Driver, Credentials] {
    switch (environment) {
        case "cloud":
            return ["d1-http", {
                accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
                databaseId: process.env.CLOUDFLARE_DATABASE_ID,
                token: process.env.CLOUDFLARE_MIGRATION_TOKEN,
            }];
        case "local":
            return [undefined, { url: process.env.DATABASE_URL }];
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