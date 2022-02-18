import Dexie, { Table } from "dexie"

class Database extends Dexie {
  customers!: Table<Customer>
  service!: Table<Service>
}

const database = new Database("crank-tools")

// v1
const v1 = {
  customers: "++id, name, email, phone",
}
database.version(1).stores(v1)

// v2
const v2 = {
  ...v1,
  customers: "++id, name, email, phone",
}
database.version(2).stores(v2)

export default database
