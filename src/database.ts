import Dexie, { Table } from "dexie"

class Database extends Dexie {
  customers!: Table<Customer>
  service!: Table<Service>
}

const database = new Database("crank-tools")

// v1
const v1 = {
  customers: "id, name, email, phone",
  service: "id, date, customer",
}
database.version(1).stores(v1)

export default database
