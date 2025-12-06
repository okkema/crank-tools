import { eq } from "drizzle-orm";
import type { Database } from "@/Database";
import { type Customer, CustomerSchema, CustomerTable } from "./CustomerSchema";

export class CustomerRepository  {
    public static schema = { CustomerTable }
    private db: Database<typeof CustomerRepository.schema>;
    constructor(db: Database<typeof CustomerRepository.schema>) {
        this.db = db;
    }
    public list(): Promise<Customer[]> {
        return this.db.query.CustomerTable.findMany();
    }
    public create(customer: Customer): Promise<Customer> {
        CustomerSchema.parse(customer);
        return this.db.insert(CustomerTable).values([customer]).returning().then(x => x[0]);
    }
    public update(customer: Customer): Promise<Customer> {
        CustomerSchema.parse(customer);
        return this.db.update(CustomerTable).set(customer).where(eq(CustomerTable.id, customer.id)).returning().then(x => x[0]);
    }
}
