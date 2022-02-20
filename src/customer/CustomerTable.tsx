import { AddCircle, Delete, Edit, MoreVert } from "@mui/icons-material"
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useLiveQuery } from "dexie-react-hooks"
import { useState } from "react"

type CustomerTableProps = {
  customers: Customer[] | Promise<Customer[]>
  onAdd: () => void
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

const CustomerTable = ({
  customers,
  onAdd: handleAdd,
  onEdit: handleEdit,
  onDelete: handleDelete,
}: CustomerTableProps): JSX.Element => {
  // rows
  const rows = useLiveQuery<Customer[]>(() => customers, [])

  // menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
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
          <IconButton onClick={handleOpen}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
    <DataGrid
      rows={rows ?? []}
      columns={columns}
      autoHeight
      loading={!rows}
      density="compact"
      pageSize={10}
      rowsPerPageOptions={[5, 10, 20]}
      pagination
    />
  )
}

export default CustomerTable
