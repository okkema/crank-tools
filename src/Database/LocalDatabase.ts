import { createClient } from "@libsql/client";
import type { Database, DatabaseSchema } from "./DatabaseSchema";
import { drizzle } from "drizzle-orm/libsql";

export async function createLocalDatabase<T extends DatabaseSchema = DatabaseSchema>(schema: T, url: string): Promise<Database<T>> {
    const client = createClient({
        url,
    });
    const db = drizzle(client, { schema });
    return db;
}