import type { APIContext, MiddlewareNext } from "astro";
import { createLocalDatabase } from "./LocalDatabase";
import type { DatabaseSchema } from "./DatabaseSchema";
import { createMemoryDatabase } from "./MemoryDatabase";
import { createCloudDatabase } from "./CloudDatabase";
import { DATABASE_URL, ENVIRONMENT } from "astro:env/server";

export function database<T extends DatabaseSchema>(schema: T) {
    return async function (context: APIContext, next: MiddlewareNext) {
        // @ts-expect-error
        context.locals.db = await (async function(environment) {
            switch (environment) {
                case "cloud":
                    return createCloudDatabase(schema, context.locals.runtime.env.DATABASE)
                case "local":
                    return createLocalDatabase(schema, DATABASE_URL);
                case "demo":
                default:
                    return createMemoryDatabase(schema);
            }
        })(ENVIRONMENT);
        return next();
    }
}