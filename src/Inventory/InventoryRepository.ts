import { eq, gt, inArray } from "drizzle-orm";
import type { Database } from "@/Database";
import { type Inventory, InventoryRelations, InventorySchema, InventoryTable} from "./InventorySchema";
import { ProductTable } from "@/Products/ProductSchema";

export class InventoryRepository {
    public static schema = { ProductTable, InventoryRelations, InventoryTable }
    private db: Database<typeof InventoryRepository.schema>;
    constructor(db: Database<typeof InventoryRepository.schema>) {
        this.db = db;
    }
    public list(includeAll: boolean = false): Promise<Inventory[]> {
        return this.db.query.InventoryTable.findMany({
            where: includeAll ? undefined : gt(InventoryTable.quantity, 0),
            with: {
                product: true,
            }
        });
    }
    public create(inventory: Inventory): Promise<Inventory> {
        InventorySchema.parse(inventory);
        return this.db.insert(InventoryTable).values([{
            ...inventory,
            product: inventory.product.id
        }]).returning()
            .then(x => ({ ...x[0], product: inventory.product }));
    }
    public update(inventory: Inventory): Promise<Inventory> {
        InventorySchema.parse(inventory);
        return this.db.update(InventoryTable).set({
            ...inventory,
            product: inventory.product.id,
        }).where(eq(InventoryTable.id, inventory.id)).returning()
            .then(x => ({ ...x[0], product: inventory.product }));
    }
    public get(...skus: string[]): Promise<Inventory[]> {
        return this.db.select()
            .from(InventoryTable)
            .innerJoin(ProductTable, eq(InventoryTable.product, ProductTable.id))
            .where(inArray(ProductTable.sku, skus))
            .then(x => x.map(c => ({ ...c.inventory, product: c.product })));
    }
}
