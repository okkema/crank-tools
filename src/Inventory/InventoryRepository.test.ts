import { beforeEach, expect, it } from "vitest";
import { InventoryRepository } from "./InventoryRepository";
import { InventoryTable } from "./InventorySchema";
import { createMemoryDatabase } from "@/Database/MemoryDatabase";
import type { Database } from "@/Database/DatabaseSchema";
import { getCount } from "@/Database/DatabaseUtilities";
import { ProductTable } from "@/Products/ProductSchema";
import * as schema from "@/schema";
let db: Database<typeof schema>;
let repo: InventoryRepository;

beforeEach(async function () {
  db = await createMemoryDatabase(schema);
  repo = new InventoryRepository(db);
  await db.insert(ProductTable).values([
    {
      id: "84cddd47-7290-4c49-a316-76042706fddd",
      sku: "product1",
      name: "Test Product",
      description: "Test product description",
      price: 1000,
    },
    {
      id: "c8cf6b7a-ef11-40d7-8958-0a4f63cc5fea",
      sku: "product2",
      name: "Another Product",
      description: "Another product description",
      price: 1500,
    }
  ]);
});

it("should list inventory in stock", async function () {
  await db.insert(InventoryTable).values([{
    id: "f6f89de0-d690-4225-823e-5505d8b5de7f",
    product: "84cddd47-7290-4c49-a316-76042706fddd",
    quantity: 1,
  }, {
    id: "0bb6ce25-8db0-444a-9ed7-b7106dff925f",
    product: "c8cf6b7a-ef11-40d7-8958-0a4f63cc5fea",
    quantity: 0,
  }]);
  const result = await repo.list();
  expect(result).toMatchInlineSnapshot(`
      [
        {
          "id": "f6f89de0-d690-4225-823e-5505d8b5de7f",
          "product": {
            "description": "Test product description",
            "id": "84cddd47-7290-4c49-a316-76042706fddd",
            "name": "Test Product",
            "price": 1000,
            "sku": "product1",
          },
          "quantity": 1,
        },
      ]
    `);
});

it("should list all inventory", async function () {
  await db.insert(InventoryTable).values([{
    id: "f6f89de0-d690-4225-823e-5505d8b5de7f",
    product: "84cddd47-7290-4c49-a316-76042706fddd",
    quantity: 1,
  }, {
    id: "0bb6ce25-8db0-444a-9ed7-b7106dff925f",
    product: "c8cf6b7a-ef11-40d7-8958-0a4f63cc5fea",
    quantity: 0,
  }]);
  const result = await repo.list(true);
  expect(result).toMatchInlineSnapshot(`
      [
        {
          "id": "f6f89de0-d690-4225-823e-5505d8b5de7f",
          "product": {
            "description": "Test product description",
            "id": "84cddd47-7290-4c49-a316-76042706fddd",
            "name": "Test Product",
            "price": 1000,
            "sku": "product1",
          },
          "quantity": 1,
        },
        {
          "id": "0bb6ce25-8db0-444a-9ed7-b7106dff925f",
          "product": {
            "description": "Another product description",
            "id": "c8cf6b7a-ef11-40d7-8958-0a4f63cc5fea",
            "name": "Another Product",
            "price": 1500,
            "sku": "product2",
          },
          "quantity": 0,
        },
      ]
    `);
});

it("should create inventory", async function () {
  const initialCount = await getCount(db, InventoryTable);
  expect(initialCount).toBe(0);
  const result = await repo.create({
    id: "f6f89de0-d690-4225-823e-5505d8b5de7f",
    product: {
      id: "84cddd47-7290-4c49-a316-76042706fddd",
      sku: "product1",
      name: "Test Product",
      description: "Test product description",
      price: 1000,
    },
    quantity: 1,
  });
  const finalCount = await getCount(db, InventoryTable);
  expect(finalCount).toBe(1);
  expect(result).toMatchInlineSnapshot(`
    {
      "id": "f6f89de0-d690-4225-823e-5505d8b5de7f",
      "product": {
        "description": "Test product description",
        "id": "84cddd47-7290-4c49-a316-76042706fddd",
        "name": "Test Product",
        "price": 1000,
        "sku": "product1",
      },
      "quantity": 1,
    }
  `);
});

it("should update inventory", async function () {
  const inventory = await db.insert(InventoryTable).values([{
    id: "f6f89de0-d690-4225-823e-5505d8b5de7f",
    product: "84cddd47-7290-4c49-a316-76042706fddd",
    quantity: 1,
  }]).returning();
  const initialCount = await getCount(db, InventoryTable);
  expect(initialCount).toBe(1);
  inventory[0].quantity = 0;
  const result = await repo.update({
    ...inventory[0],
    product: {
      id: "84cddd47-7290-4c49-a316-76042706fddd",
      sku: "product1",
      name: "Test Product",
      description: "Test product description",
      price: 1000,
    }
  });
  const finalCount = await getCount(db, InventoryTable);
  expect(finalCount).toBe(1);
  expect(result).toMatchInlineSnapshot(`
    {
      "id": "f6f89de0-d690-4225-823e-5505d8b5de7f",
      "product": {
        "description": "Test product description",
        "id": "84cddd47-7290-4c49-a316-76042706fddd",
        "name": "Test Product",
        "price": 1000,
        "sku": "product1",
      },
      "quantity": 0,
    }
  `);
});

it("should get inventory from product skus", async function () {
  await db.insert(InventoryTable).values([{
    id: "f6f89de0-d690-4225-823e-5505d8b5de7f",
    product: "84cddd47-7290-4c49-a316-76042706fddd",
    quantity: 1,
  }, {
    id: "0bb6ce25-8db0-444a-9ed7-b7106dff925f",
    product: "c8cf6b7a-ef11-40d7-8958-0a4f63cc5fea",
    quantity: 0,
  }]);
  const result = await repo.get("product1", "product2");
  expect(result).toMatchInlineSnapshot(`
      [
        {
          "id": "f6f89de0-d690-4225-823e-5505d8b5de7f",
          "product": {
            "description": "Test product description",
            "id": "84cddd47-7290-4c49-a316-76042706fddd",
            "name": "Test Product",
            "price": 1000,
            "sku": "product1",
          },
          "quantity": 1,
        },
        {
          "id": "0bb6ce25-8db0-444a-9ed7-b7106dff925f",
          "product": {
            "description": "Another product description",
            "id": "c8cf6b7a-ef11-40d7-8958-0a4f63cc5fea",
            "name": "Another Product",
            "price": 1500,
            "sku": "product2",
          },
          "quantity": 0,
        },
      ]
    `);
});
