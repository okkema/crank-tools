import { beforeEach, expect, it } from "vitest";
import { CustomerRepository } from "./CustomerRepository";
import { CustomerTable } from "./CustomerSchema";
import { createMemoryDatabase } from "@/Database/MemoryDatabase";
import type { Database } from "@/Database/DatabaseSchema";
import { getCount } from "@/Database/DatabaseUtilities";

let db: Database<typeof CustomerRepository.schema>;
let repo: CustomerRepository;

beforeEach(async function () {
  db = await createMemoryDatabase(CustomerRepository.schema);
  repo = new CustomerRepository(db);
});

it("should list the customers", async function () {
  await db.insert(CustomerTable).values([{
    id: "84cddd47-7290-4c49-a316-76042706fddd",
    name: "Test Customer",
    email: "test@example.com",
  }, {
    id: "433da797-36b9-42b0-b4c5-ba29bf2c4c63",
    name: "New Customer",
    email: "new@example.com",
  }]);
  const result = await repo.list();
  expect(result).toMatchInlineSnapshot(`
    [
      {
        "email": "test@example.com",
        "id": "84cddd47-7290-4c49-a316-76042706fddd",
        "name": "Test Customer",
      },
      {
        "email": "new@example.com",
        "id": "433da797-36b9-42b0-b4c5-ba29bf2c4c63",
        "name": "New Customer",
      },
    ]
  `);
});

it("should create a customer", async function () {
  const initialCount = await getCount(db, CustomerTable);
  expect(initialCount).toBe(0);
  const result = await repo.create({
    id: "84cddd47-7290-4c49-a316-76042706fddd",
    name: "Test Customer",
    email: "test@example.com",
  });
  const finalCount = await getCount(db, CustomerTable);
  expect(finalCount).toBe(1);
  expect(result).toMatchInlineSnapshot(`
    {
      "email": "test@example.com",
      "id": "84cddd47-7290-4c49-a316-76042706fddd",
      "name": "Test Customer",
    }
  `);
});

it("should update the customer", async function () {
  const customers = await db.insert(CustomerTable).values([{
    id: "84cddd47-7290-4c49-a316-76042706fddd",
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
      "id": "84cddd47-7290-4c49-a316-76042706fddd",
      "name": "Test Customer",
    }
  `);
});

it("should search the customers by name or email", async function () {
    await db.insert(CustomerTable).values([{
        id: "84cddd47-7290-4c49-a316-76042706fddd",
        name: "Test Customer",
        email: "example@tld.com",
    }, {
        id: "433da797-36b9-42b0-b4c5-ba29bf2c4c63",
        name: "Another Customer",
        email: "test@example.com",
    }, {
        id: "4200ffe0-1c19-4ecc-848f-f40674ba1b5e",
        name: "Skipped Customer",
        email: "skipped@example.com",
    }]);
    const result = await repo.search("%test%");
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "email": "example@tld.com",
          "id": "84cddd47-7290-4c49-a316-76042706fddd",
          "name": "Test Customer",
        },
        {
          "email": "test@example.com",
          "id": "433da797-36b9-42b0-b4c5-ba29bf2c4c63",
          "name": "Another Customer",
        },
      ]
    `);
});