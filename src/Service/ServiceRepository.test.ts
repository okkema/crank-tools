import { beforeEach, expect, it } from "vitest";
import { ServiceRepository } from "./ServiceRepository";
import { ServiceTable } from "./ServiceSchema";
import { createMemoryDatabase } from "@/Database/MemoryDatabase";
import type { Database } from "@/Database/DatabaseSchema";
import { getCount } from "@/Database/DatabaseUtilities";
import { CustomerTable } from "@/Customers/CustomerSchema";
import * as schema from "@/schema";
let db: Database<typeof schema>;
let repo: ServiceRepository;

beforeEach(async function () {
  db = await createMemoryDatabase(schema);
  repo = new ServiceRepository(db);
  await db.insert(CustomerTable).values([{
    id: "84cddd47-7290-4c49-a316-76042706fddd",
    name: "Test Customer",
    email: "test@example.com",
  }]);
});

it("should list the services between the dates inclusively", async function () {
  await db.insert(ServiceTable).values([{
    id: "304f6486-6cd1-4ccd-876a-db8e5c57d209",
    date: "2025-12-04",
    customer: "84cddd47-7290-4c49-a316-76042706fddd",
    status: "pending",
  }, {
    id: "d1d913ac-daad-4113-9de7-4b714e9c1ddc",
    date: "2025-12-05",
    customer: "84cddd47-7290-4c49-a316-76042706fddd",
    status: "pending",
  }, {
    id: "fd50ad93-bde3-4fd9-8305-8020a85c59af",
    date: "2025-12-06",
    customer: "84cddd47-7290-4c49-a316-76042706fddd",
    status: "pending",
  }, {
    id: "2723c099-41a9-487f-82b7-b211297e4198",
    date: "2025-12-07",
    customer: "84cddd47-7290-4c49-a316-76042706fddd",
    status: "pending",
  }]);
  const start = "2025-12-05";
  const end = "2025-12-06";
  const result = await repo.list(start, end);
  expect(result).toMatchInlineSnapshot(`
      [
        {
          "customer": {
            "email": "test@example.com",
            "id": "84cddd47-7290-4c49-a316-76042706fddd",
            "name": "Test Customer",
          },
          "date": "2025-12-05",
          "id": "d1d913ac-daad-4113-9de7-4b714e9c1ddc",
          "status": "pending",
        },
        {
          "customer": {
            "email": "test@example.com",
            "id": "84cddd47-7290-4c49-a316-76042706fddd",
            "name": "Test Customer",
          },
          "date": "2025-12-06",
          "id": "fd50ad93-bde3-4fd9-8305-8020a85c59af",
          "status": "pending",
        },
      ]
    `);
});

it("should create a service", async function () {
  const initialCount = await getCount(db, ServiceTable);
  expect(initialCount).toBe(0);
  const result = await repo.create({
    id: "304f6486-6cd1-4ccd-876a-db8e5c57d209",
    date: "2025-12-04",
    customer: {
      id: "84cddd47-7290-4c49-a316-76042706fddd",
      name: "Test Customer",
      email: "test@example.com",
    },
    status: "pending",
  });
  const finalCount = await getCount(db, ServiceTable);
  expect(finalCount).toBe(1);
  expect(result).toMatchInlineSnapshot(`
      {
        "customer": {
          "email": "test@example.com",
          "id": "84cddd47-7290-4c49-a316-76042706fddd",
          "name": "Test Customer",
        },
        "date": "2025-12-04",
        "id": "304f6486-6cd1-4ccd-876a-db8e5c57d209",
        "status": "pending",
      }
    `);
});

it("should update the service", async function () {
  const services = await db.insert(ServiceTable).values([{
    id: "304f6486-6cd1-4ccd-876a-db8e5c57d209",
    date: "2025-12-04",
    customer: "84cddd47-7290-4c49-a316-76042706fddd",
    status: "pending",
  }]).returning();
  const initialCount = await getCount(db, ServiceTable);
  expect(initialCount).toBe(1);
  services[0].date = "2025-12-05";
  const result = await repo.update({
    ...services[0],
    customer: {
      id: "84cddd47-7290-4c49-a316-76042706fddd",
      name: "Test Customer",
      email: "test@example.com"
    }
  });
  const finalCount = await getCount(db, ServiceTable);
  expect(finalCount).toBe(1);
  expect(result).toMatchInlineSnapshot(`
      {
        "customer": {
          "email": "test@example.com",
          "id": "84cddd47-7290-4c49-a316-76042706fddd",
          "name": "Test Customer",
        },
        "date": "2025-12-05",
        "id": "304f6486-6cd1-4ccd-876a-db8e5c57d209",
        "status": "pending",
      }
    `);
});

it("should get the service by id", async function () {
  await db.insert(ServiceTable).values([{
    id: "304f6486-6cd1-4ccd-876a-db8e5c57d209",
    date: "2025-12-04",
    customer: "84cddd47-7290-4c49-a316-76042706fddd",
    status: "pending",
  }]);
  const result = await repo.get("304f6486-6cd1-4ccd-876a-db8e5c57d209");
  expect(result).toMatchInlineSnapshot(`
    {
      "customer": {
        "email": "test@example.com",
        "id": "84cddd47-7290-4c49-a316-76042706fddd",
        "name": "Test Customer",
      },
      "date": "2025-12-04",
      "id": "304f6486-6cd1-4ccd-876a-db8e5c57d209",
      "status": "pending",
    }
  `);
});