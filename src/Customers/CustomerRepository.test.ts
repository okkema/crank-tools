import { beforeEach, expect, it } from "vitest";
import { CustomerRepository } from "./CustomerRepository";
import { CustomerTable } from "./CustomerSchema";
import { createMemoryDatabase } from "../Database/MemoryDatabase";
import type { Database } from "../Database/DatabaseSchema";
import { getCount } from "../Database/DatabaseUtilities";

let db: Database<typeof CustomerRepository.schema>;
let repo: CustomerRepository;

beforeEach(async function () {
  db = await createMemoryDatabase(CustomerRepository.schema);
  repo = new CustomerRepository(db);
});

it("should list the customers", async function () {
  await db.insert(CustomerTable).values([{
    id: "123",
    name: "Test Customer",
    email: "test@example.com",
  }, {
    id: "124",
    name: "New Customer",
    email: "new@example.com",
  }]);
  const result = await repo.list();
  expect(result).toMatchInlineSnapshot(`
    [
      {
        "email": "test@example.com",
        "id": "123",
        "name": "Test Customer",
      },
      {
        "email": "new@example.com",
        "id": "124",
        "name": "New Customer",
      },
    ]
  `);
});

it("should create a customer", async function () {
  const initialCount = await getCount(db, CustomerTable);
  expect(initialCount).toBe(0);
  const result = await repo.create({
    id: "123",
    name: "Test Customer",
    email: "test@example.com",
  });
  const finalCount = await getCount(db, CustomerTable);
  expect(finalCount).toBe(1);
  expect(result).toMatchInlineSnapshot(`
    {
      "email": "test@example.com",
      "id": "123",
      "name": "Test Customer",
    }
  `);
});

it("should update the customer", async function () {
  const customers = await db.insert(CustomerTable).values([{
    id: "123",
    name: "Test Customer",
    email: "test@example.com",
  }]).returning();
  const initialCount = await getCount(db, CustomerTable);
  expect(initialCount).toBe(1);
  customers[0].email = "new@example.com";
  const result = await repo.update(customers[0]);
  const finalCount = await getCount(db, CustomerTable);
  expect(finalCount).toBe(1);
  expect(result).toMatchInlineSnapshot(`
    {
      "email": "new@example.com",
      "id": "123",
      "name": "Test Customer",
    }
  `);
});