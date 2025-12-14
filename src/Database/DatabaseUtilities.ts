import type { SQLiteTable } from "drizzle-orm/sqlite-core";
import type { Database, DatabaseSchema } from "./DatabaseSchema";
import { count } from "drizzle-orm";

export async function getCount(db: Database<DatabaseSchema>, table: SQLiteTable) {
    const result = await db.select({ count: count() }).from(table);
    return result[0].count;
}