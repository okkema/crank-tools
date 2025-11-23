import type { Database } from "../Database";
import { type Customer, Customers } from "./CustomerSchema";

export class CustomerRepository  {
    public static schema = { Customers }
    private db: Database<typeof CustomerRepository.schema>;
    constructor(db: Database<typeof CustomerRepository.schema>) {
        this.db = db;
    }
    public list(): Promise<Customer[]> {
        return this.db.query.Customers.findMany();
    }
}
