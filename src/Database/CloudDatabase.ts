import type { Database, DatabaseSchema } from "./DatabaseSchema";
import { drizzle } from "drizzle-orm/d1";

export async function createCloudDatabase<T extends DatabaseSchema>(schema: T, d1: D1Database): Promise<Database<T>> {
    const db = drizzle(d1, { schema });
    return db;
}