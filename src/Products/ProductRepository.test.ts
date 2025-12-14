import { beforeEach, expect, it } from "vitest";
import { ProductRepository } from "./ProductRepository";
import { ProductTable } from "./ProductSchema";
import { createMemoryDatabase } from "@/Database/MemoryDatabase";
import type { Database } from "@/Database/DatabaseSchema";
import { getCount } from "@/Database/DatabaseUtilities";

let db: Database<typeof ProductRepository.schema>;
let repo: ProductRepository;

beforeEach(async function () {
    db = await createMemoryDatabase(ProductRepository.schema);
    repo = new ProductRepository(db);
});

it("should list the products", async function () {
    await db.insert(ProductTable).values([{
        id: "84cddd47-7290-4c49-a316-76042706fddd",
        sku: "product1",
        name: "Test Product",
        description: "Description of a test product",
        price: 1000,
    }, {
        id: "433da797-36b9-42b0-b4c5-ba29bf2c4c63",
        sku: "product2",
        name: "Another Product",
        price: 1500,
    }]);
    const result = await repo.list();
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "description": "Description of a test product",
          "id": "84cddd47-7290-4c49-a316-76042706fddd",
          "name": "Test Product",
          "price": 1000,
          "sku": "product1",
        },
        {
          "description": null,
          "id": "433da797-36b9-42b0-b4c5-ba29bf2c4c63",
          "name": "Another Product",
          "price": 1500,
          "sku": "product2",
        },
      ]
    `);
});

it("should create a product", async function () {
    const initialCount = await getCount(db, ProductTable);
    expect(initialCount).toBe(0);
    const result = await repo.create({
        id: "84cddd47-7290-4c49-a316-76042706fddd",
        sku: "product1",
        name: "Test Product",
        description: "Description of a test product",
        price: 1000,
    });
    const finalCount = await getCount(db, ProductTable);
    expect(finalCount).toBe(1);
    expect(result).toMatchInlineSnapshot(`
      {
        "description": "Description of a test product",
        "id": "84cddd47-7290-4c49-a316-76042706fddd",
        "name": "Test Product",
        "price": 1000,
        "sku": "product1",
      }
    `);
});

it("should update the product", async function () {
    const products = await db.insert(ProductTable).values([{
        id: "84cddd47-7290-4c49-a316-76042706fddd",
        sku: "product1",
        name: "Test Product",
        description: "Description of a test product",
        price: 1000,
    }]).returning();
    const initialCount = await getCount(db, ProductTable);
    expect(initialCount).toBe(1);
    products[0].sku = "newproduct1";
    const result = await repo.update(products[0]);
    const finalCount = await getCount(db, ProductTable);
    expect(finalCount).toBe(1);
    expect(result).toMatchInlineSnapshot(`
      {
        "description": "Description of a test product",
        "id": "84cddd47-7290-4c49-a316-76042706fddd",
        "name": "Test Product",
        "price": 1000,
        "sku": "newproduct1",
      }
    `);
});

it("should search the products by sku, name or description", async function () {
    await db.insert(ProductTable).values([{
        id: "84cddd47-7290-4c49-a316-76042706fddd",
        sku: "product1",
        name: "Product 1",
        description: "Description of a test product",
        price: 1000,
    }, {
        id: "433da797-36b9-42b0-b4c5-ba29bf2c4c63",
        sku: "product2",
        name: "Another Product",
        description: "Test product description",
        price: 1500,
    }, {
        id: "4d396b03-b585-4961-b466-c0665b77556c",
        sku: "skutest123",
        name: "Yet Another Product",
        description: "Product description for this one",
        price: 1499,
    }, {
        id: "4200ffe0-1c19-4ecc-848f-f40674ba1b5e",
        sku: "product4",
        name: "Skipped Product",
        description: "Product is missing search term",
        price: 2500,
    }]);
    const result = await repo.search("%test%");
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "description": "Description of a test product",
          "id": "84cddd47-7290-4c49-a316-76042706fddd",
          "name": "Product 1",
          "price": 1000,
          "sku": "product1",
        },
        {
          "description": "Test product description",
          "id": "433da797-36b9-42b0-b4c5-ba29bf2c4c63",
          "name": "Another Product",
          "price": 1500,
          "sku": "product2",
        },
        {
          "description": "Product description for this one",
          "id": "4d396b03-b585-4961-b466-c0665b77556c",
          "name": "Yet Another Product",
          "price": 1499,
          "sku": "skutest123",
        },
      ]
    `);
});

it("should get the product by sku", async function () {
    await db.insert(ProductTable).values([{
        id: "84cddd47-7290-4c49-a316-76042706fddd",
        sku: "product1",
        name: "Product 1",
        description: "Description of a test product",
        price: 1000,
    }]);
    const result = await repo.get("product1");
    expect(result).toMatchInlineSnapshot(`
      {
        "description": "Description of a test product",
        "id": "84cddd47-7290-4c49-a316-76042706fddd",
        "name": "Product 1",
        "price": 1000,
        "sku": "product1",
      }
    `);
});