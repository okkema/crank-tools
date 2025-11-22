import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import type { Database, DatabaseSchema } from "./DatabaseSchema"

export async function createMemoryDatabase<T extends DatabaseSchema>(schema: T): Promise<Database<T>> {
    const client = createClient({
        url: ":memory:",
    });
    const db = drizzle(client, { schema });
    await migrate(db, { migrationsFolder: "./migrations" })
    return db;
}