import { type Customer, Customers } from "./CustomerSchema";
import { type BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";

export class CustomerRepository  {
    public static schema = { Customers }
    private db: BaseSQLiteDatabase<"async", any, typeof CustomerRepository.schema>;
    constructor(db: BaseSQLiteDatabase<"async", any, typeof CustomerRepository.schema>) {
        this.db = db;
    }
    public list(): Promise<Customer[]> {
        return this.db.query.Customers.findMany();
    }
}
