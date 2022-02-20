import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import { v4 as uuid } from "uuid"
import database from "../database"
import { useAlert } from "../shared/AlertProvider"
import CustomerForm from "./CustomerForm"
import CustomerTable from "./CustomerTable"

const CustomerDatabase = (): JSX.Element => {
  // alert
  const alert = useAlert()

  // form
  const [open, setOpen] = useState(false)
  const [customer, setCustomer] = useState<Customer>()
  const handleSubmit = async (customer: Customer) => {
    if (!customer.id) customer.id = uuid()
    await database.customers.put(customer, customer.id)
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false)
  }

  // table
  const customers = database.customers.toArray()
  const handleAdd = () => {
    setCustomer(undefined)
    setOpen(true)
  }
  const handleDelete = async (customer: Customer) => {
    await database.customers.delete(customer.id)
    alert.push({
      message: "Customer deleted",
      action: {
        text: "undo",
        onClick: () => {
          database.customers.add(customer)
        },
      },
    })
  }
  const handleEdit = (customer: Customer) => {
    setCustomer(customer)
    setOpen(true)
  }

  return (
    <>
      <CustomerTable
        customers={customers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{customer ? "Edit" : "Add"} Customer</DialogTitle>
        <DialogContent>
          <CustomerForm
            customer={customer}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CustomerDatabase
