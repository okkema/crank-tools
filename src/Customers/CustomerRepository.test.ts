import { expect, it } from "vitest";
import { CustomerRepository } from "./CustomerRepository";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { Customers } from "./CustomerSchema";

it("should list the customers", async function() {
    const db = drizzle(createClient({
        url: ":memory:",
    }), { schema: CustomerRepository.schema });
    await migrate(db, { migrationsFolder: "./migrations" })
    await db.insert(Customers).values([{
        id: "123",
        name: "Test Customer",
        email: "test@example.com",
    }]);
    const repo = new CustomerRepository(db);
    const result = await repo.list();
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "email": "test@example.com",
          "id": "123",
          "name": "Test Customer",
        },
      ]
    `);
});