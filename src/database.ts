import Dexie, { Table } from "dexie"

class Database extends Dexie {
  customers!: Table<Customer>
}

const database = new Database("crank-tools")

// v1
const v1 = {
  customers: "id, name, email, phone",
}
database.version(1).stores(v1)

export default database
