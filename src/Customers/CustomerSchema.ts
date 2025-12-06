import { z } from "zod";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const CustomerTable = sqliteTable("customers", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
});

export const CustomerSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
});

export type Customer = z.infer<typeof CustomerSchema>;