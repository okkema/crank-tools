import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useFormik } from "formik"
import { useState } from "react"
import CustomerModal from "./CustomerModal"
import { v4 as uuid } from "uuid"
import database from "../database"
import { AddCircle, Delete, Edit, MoreVert } from "@mui/icons-material"
import useCustomers from "./useCustomers"
import { useAlert } from "../shared/AlertProvider"

const DEFAULT: Customer = {
  id: "",
  name: "",
  email: "",
  phone: "",
}

const CustomerDatabase = (): JSX.Element => {
  // customers
  const { customers, loading } = useCustomers()

  // alert
  const alert = useAlert()

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
  const handleAdd = () => {
    setValues(DEFAULT)
    setOpen(true)
  }
  const handleDelete = async (customer: Customer) => {
    setAnchorEl(null)
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
    setAnchorEl(null)
    setValues(customer)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  // menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenu = () => {
    setAnchorEl(null)
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
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenu}>
            <MenuItem onClick={() => handleEdit(row)}>
              <ListItemIcon>
                <Edit color="primary" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleDelete(row)}>
              <ListItemIcon>
                <Delete color="error" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
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
    <>
      <DataGrid
        rows={customers}
        columns={columns}
        autoHeight
        loading={loading}
        density="compact"
        rowsPerPageOptions={[10, 25, 100]}
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
