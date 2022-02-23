import database from "../database"
import createCustomers from "./createCustomers"

const toggleDemoMode = async (initialize: boolean) => {
  await database.customers.toCollection().delete()
  if (initialize) {
    const customers = createCustomers(100)
    await database.customers.bulkAdd(customers)
  }
}

export default toggleDemoMode
