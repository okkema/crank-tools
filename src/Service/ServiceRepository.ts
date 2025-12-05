import { and, eq, gte, lte } from "drizzle-orm";
import type { Database } from "../Database";
import { type Service, ServiceRelations, ServiceTable} from "./ServiceSchema";
import { CustomerTable } from "../Customers/CustomerSchema";

export class ServiceRepository {
    public static schema = { CustomerTable, ServiceRelations, ServiceTable }
    private db: Database<typeof ServiceRepository.schema>;
    constructor(db: Database<typeof ServiceRepository.schema>) {
        this.db = db;
    }
    public list(start: string, end: string): Promise<Service[]> {
        return this.db.query.ServiceTable.findMany({
            where: and(gte(ServiceTable.date, start), lte(ServiceTable.date, end)),
            with: {
                customer: true,
            }
        });
    }
    public create(service: Service): Promise<Service> {
        return this.db.insert(ServiceTable).values([{
            ...service,
            customer: service.customer.id
        }]).returning()
            .then(x => ({ ...x[0], customer: service.customer }));
    }
    public update(service: Service): Promise<Service> {
        return this.db.update(ServiceTable).set({
            ...service,
            customer: service.customer.id
        }).where(eq(ServiceTable.id, service.id)).returning()
            .then(x => ({ ...x[0], customer: service.customer }));
    }
}
