import { z } from "zod";
import { ProductTable } from "@/schema";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ProductSchema } from "@/Products/ProductSchema";

export const InventoryTable = sqliteTable("inventory", {
    id: text("id").primaryKey(),
    product: text("product").notNull().references(() => ProductTable.id),
    quantity: integer("quantity").notNull(),
});

export const InventoryRelations = relations(InventoryTable, ({ one }) => ({
    product: one(ProductTable, {
        fields: [InventoryTable.product],
        references: [ProductTable.id],
    })
}));

export const InventorySchema = z.object({
    id: z.string().uuid(),
    product: ProductSchema,
    quantity: z.number().int().nonnegative(),
});

export type Inventory = z.infer<typeof InventorySchema>;