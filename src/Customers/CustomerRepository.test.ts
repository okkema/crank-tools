import { expect, it } from "vitest";
import { CustomerRepository } from "./CustomerRepository";
import { Customers } from "./CustomerSchema";
import { createMemoryDatabase } from "../Database/MemoryDatabase";

it("should list the customers", async function() {
    const db = await createMemoryDatabase(CustomerRepository.schema);
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