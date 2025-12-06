import { z } from "zod";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { CustomerSchema, CustomerTable } from "@/Customers/CustomerSchema";
import { relations } from "drizzle-orm";

export const ServiceStatusValues = [
    "pending",
    "active",
    "issue",
    "completed",
    "delivered",
] as const;

export const ServiceStatusSchema = z.enum(ServiceStatusValues);

export type ServiceStatus = z.infer<typeof ServiceStatusSchema>;

export const ServiceTable = sqliteTable("service", {
    id: text("id").primaryKey(),
    date: text("date").notNull(),
    customer: text("customer").notNull().references(() => CustomerTable.id),
    status: text("status", { enum: ServiceStatusValues }).notNull(),
});

export const ServiceRelations = relations(ServiceTable, ({ one }) => ({ 
    customer: one(CustomerTable, {
        fields: [ServiceTable.customer],
        references: [CustomerTable.id],
    }),
}));

export const ServiceSchema = z.object({
    id: z.string().uuid(),
    date: z.string().date(),
    customer: CustomerSchema,
    status: ServiceStatusSchema,
});

export type Service = z.infer<typeof ServiceSchema>;