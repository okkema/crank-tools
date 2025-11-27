import { eq } from "drizzle-orm";
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
    public create(customer: Customer): Promise<Customer> {
        return this.db.insert(Customers).values([customer]).returning().then(x => x[0]);
    }
    public update(customer: Customer): Promise<Customer> {
        return this.db.update(Customers).set(customer).where(eq(Customers.id, customer.id)).returning().then(x => x[0]);
    }
}
