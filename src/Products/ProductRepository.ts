import { eq, like, or } from "drizzle-orm";
import type { Database } from "@/Database";
import { type Product, ProductSchema, ProductTable } from "./ProductSchema";

export class ProductRepository  {
    public static schema = { ProductTable }
    private db: Database<typeof ProductRepository.schema>;
    constructor(db: Database<typeof ProductRepository.schema>) {
        this.db = db;
    }
    public list(): Promise<Product[]> {
        return this.db.query.ProductTable.findMany();
    }
    public create(product: Product): Promise<Product> {
        ProductSchema.parse(product);
        return this.db.insert(ProductTable).values([product]).returning().then(x => x[0]);
    }
    public update(product: Product): Promise<Product> {
        ProductSchema.parse(product);
        return this.db.update(ProductTable).set(product).where(eq(ProductTable.id, product.id)).returning().then(x => x[0]);
    }
    public search(query: string): Promise<Product[]> {
        return this.db.query.ProductTable.findMany({
            where: or(
                like(ProductTable.sku, query),
                like(ProductTable.name, query),
                like(ProductTable.description, query),
            ), 
        });
    }
    public get(sku: string): Promise<Product | undefined> {
        return this.db.query.ProductTable.findFirst({
            where: eq(ProductTable.sku, sku),
        });
    }
}
