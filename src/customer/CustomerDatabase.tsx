import { Box, Container, IconButton } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import CustomerModal from "./CustomerModal"
import { v4 as uuid } from "uuid"
import database from "../database"
import { AddCircle, Delete, Edit } from "@mui/icons-material"

export type Customer = {
  id: string
  name: string
  email: string
  phone: string
}

const DEFAULT: Customer = {
  id: "",
  name: "",
  email: "",
  phone: "",
}

const CustomerDatabase = (): JSX.Element => {
  // rows
  const [rows, setRows] = useState<Customer[]>([])
  const fetchRows = async () => {
    const customers = await database.customers.toArray()
    setRows(customers)
  }
  useEffect(() => {
    fetchRows()
  }, [])

  // dialog
  const [open, setOpen] = useState(false)
  const { values, handleChange, setValues, handleSubmit } = useFormik<Customer>(
    {
      initialValues: DEFAULT,
      onSubmit: async (customer) => {
        if (!customer.id) customer.id = uuid()
        await database.customers.put(customer, customer.id)
        setOpen(false)
      },
    },
  )

  // handlers
  const handleAdd = () => {
    setValues(DEFAULT)
    setOpen(true)
  }
  const handleDelete = async (customer: Customer) => {
    await database.customers.delete(customer.id)
    fetchRows()
  }
  const handleEdit = (customer: Customer) => {
    setValues(customer)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  // columns
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "action",
      renderHeader: () => (
        <IconButton onClick={handleAdd} color="success">
          <AddCircle />
        </IconButton>
      ),
      renderCell: ({ row }) => (
        <>
          <IconButton onClick={() => handleDelete(row)} color="error">
            <Delete />
          </IconButton>
          <IconButton onClick={() => handleEdit(row)} color="primary">
            <Edit />
          </IconButton>
          ,
        </>
      ),
      disableColumnMenu: true,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
  ]

  return (
    <Container>
      <Box paddingTop={2}>
        <DataGrid rows={rows} columns={columns} autoHeight />
      </Box>
      <CustomerModal
        open={open}
        customer={values}
        onClose={handleClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default CustomerDatabase
