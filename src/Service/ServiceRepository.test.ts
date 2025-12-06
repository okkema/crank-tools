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
        id: "123",
        name: "Test Customer",
        email: "test@example.com",
    }]);
});

it("should list the services between the dates inclusively", async function () {
    await db.insert(ServiceTable).values([{
        id: "123",
        date: "2025-12-04",
        customer: "123",
    }, {
        id: "124",
        date: "2025-12-05",
        customer: "123",
    }, {
        id: "125",
        date: "2025-12-06",
        customer: "123",
    }, {
        id: "126",
        date: "2025-12-07",
        customer: "123",
    }]);
    const start = "2025-12-05";
    const end = "2025-12-06";
    const result = await repo.list(start, end);
    expect(result).toMatchInlineSnapshot(`
    [
      {
        "customer": {
          "email": "test@example.com",
          "id": "123",
          "name": "Test Customer",
        },
        "date": "2025-12-05",
        "id": "124",
      },
      {
        "customer": {
          "email": "test@example.com",
          "id": "123",
          "name": "Test Customer",
        },
        "date": "2025-12-06",
        "id": "125",
      },
    ]
  `);
});

it("should create a service", async function () {
    const initialCount = await getCount(db, ServiceTable);
    expect(initialCount).toBe(0);
    const result = await repo.create({
        id: "123",
        date: "2025-12-04",
        customer: {
            id: "123",
            name: "Test Customer",
            email: "test@example.com",
        }
    });
    const finalCount = await getCount(db, ServiceTable);
    expect(finalCount).toBe(1);
    expect(result).toMatchInlineSnapshot(`
    {
      "customer": {
        "email": "test@example.com",
        "id": "123",
        "name": "Test Customer",
      },
      "date": "2025-12-04",
      "id": "123",
    }
  `);
});

it("should update the Service", async function () {
    const services = await db.insert(ServiceTable).values([{
        id: "123",
        date: "2025-12-04",
        customer: "123",
    }]).returning();
    const initialCount = await getCount(db, ServiceTable);
    expect(initialCount).toBe(1);
    services[0].date = "2025-12-05";
    const result = await repo.update({
        ...services[0],
        customer: {
            id: "123",
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
          "id": "123",
          "name": "Test Customer",
        },
        "date": "2025-12-05",
        "id": "123",
      }
    `);
});