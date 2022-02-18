import { useEffect, useState } from "react"
import database from "../database"
import { v4 as uuid } from "uuid"

const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)

  const getAll = async () => {
    setLoading(true)
    const customers = await database.customers.toArray()
    setCustomers(customers)
    setLoading(false)
  }

  const put = async (customer: Customer) => {
    if (!customer.id) customer.id = uuid()
    await database.customers.put(customer)
    getAll()
  }

  const remove = async (customer: Customer) => {
    await database.customers.delete(customer.id)
    getAll()
  }

  useEffect(() => {
    getAll()
  }, [])

  return { customers, loading, getAll, put, remove }
}

export default useCustomers
