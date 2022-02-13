import Dexie, { Table } from "dexie"

class Database extends Dexie {
  customers!: Table<Customer>
}

const database = new Database("crank-tools")

// v1
database.version(1).stores({
  customers: "++id, name, email, phone",
})

export default database
