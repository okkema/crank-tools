import { IconButton } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useFormik } from "formik"
import { useState } from "react"
import CustomerModal from "./CustomerModal"
import { AddCircle, Delete, Edit } from "@mui/icons-material"
import useCustomers from "./useCustomers"

const CustomerDatabase = (): JSX.Element => {
  // customers
  const { customers, loading, put, remove } = useCustomers()

  // dialog
  const [open, setOpen] = useState(false)
  const { values, handleChange, setValues, handleSubmit } = useFormik<Customer>(
    {
      initialValues: {} as Customer,
      onSubmit: (customer) => {
        put(customer)
        setOpen(false)
      },
    },
  )

  // handlers
  const handleAdd = () => {
    setValues({} as Customer)
    setOpen(true)
  }
  const handleDelete = remove
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
        </>
      ),
      disableColumnMenu: true,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
  ]

  return (
    <>
      <DataGrid
        rows={customers}
        columns={columns}
        loading={loading}
        autoHeight
      />
      <CustomerModal
        open={open}
        customer={values}
        onClose={handleClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default CustomerDatabase
