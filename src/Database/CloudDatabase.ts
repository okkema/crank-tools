import type { Database, DatabaseSchema } from "./DatabaseSchema";
import { drizzle } from "drizzle-orm/d1";
import { type D1Database } from "@cloudflare/workers-types";

export async function createCloudDatabase<T extends DatabaseSchema>(schema: T, d1: D1Database): Promise<Database<T>> {
    const db = drizzle(d1, { schema });
    return db;
}