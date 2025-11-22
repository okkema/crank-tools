import type { BaseSQLiteDatabase, SQLiteTable } from "drizzle-orm/sqlite-core";

export const MigrationsFolder = "./migrations";

export interface DatabaseSchema {
    [key: string]: SQLiteTable
}

export interface Database<T extends DatabaseSchema> extends BaseSQLiteDatabase<"async", any, T> {}