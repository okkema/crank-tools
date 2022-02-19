import { useLiveQuery } from "dexie-react-hooks"
import database from "../database"

const useCustomers = () => {
  const data = useLiveQuery<Customer[]>(() => database.customers.toArray(), [])
  const customers = data ?? []
  const loading = data === undefined

  return { customers, loading }
}

export default useCustomers
