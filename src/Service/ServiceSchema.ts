import { z } from "zod";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { CustomerSchema, CustomerTable } from "../Customers/CustomerSchema";

export const ServiceTable = sqliteTable("service", {
    id: text("id").primaryKey(),
    date: text("date").notNull(),
    customer: text("customer").references(() => CustomerTable.id),
});

export const ServiceSchema = z.object({
    id: z.string().uuid(),
    date: z.string().date(),
    customer: CustomerSchema,
});

export type Service = z.infer<typeof ServiceSchema>;