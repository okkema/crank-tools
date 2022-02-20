import { List, ListItem, ListItemText, Switch } from "@mui/material"
import { useState } from "react"
import database from "../database"
import { v4 as uuid } from "uuid"
import faker from "@faker-js/faker"

const createCustomers = (count: number): Customer[] => {
  return Array.from({ length: count }, () => ({
    id: uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
  }))
}

const DemoMode = (): JSX.Element => {
  const [checked, setChecked] = useState(false)
  const primary = "Demo Mode"
  const secondary = checked
    ? "WARNING - Disabling Demo Mode will wipe all data."
    : "WARNING - Enabling Demo Mode will wipe data and populate Crank Tools with test data."

  const handleChange = async (_: any, checked: boolean) => {
    await database.customers.toCollection().delete()
    if (checked) {
      const customers = createCustomers(100)
      console.log(customers)
      await database.customers.bulkAdd(customers)
    }
    setChecked(checked)
  }

  return (
    <ListItem>
      <ListItemText primary={primary} secondary={secondary} />
      <Switch checked={checked} onChange={handleChange} />
    </ListItem>
  )
}

export default DemoMode
