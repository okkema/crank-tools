import { z } from "zod";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ProductTable = sqliteTable("product", {
    id: text("id").primaryKey(),
    sku: text("sku").unique().notNull(),
    name: text("name").notNull(),
    description: text("description"),
    price: integer("price").notNull(),
});

export const ProductSchema = z.object({
    id: z.string().uuid(),
    sku: z.string(),
    name: z.string(),
    description: z.string().nullish(),
    price: z.number().int(),
});

export type Product = z.infer<typeof ProductSchema>;