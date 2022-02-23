import { AddCircle, Delete, Edit, MoreVert } from "@mui/icons-material"
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material"
import { GridColDef, GridDensity } from "@mui/x-data-grid"
import { useLiveQuery } from "dexie-react-hooks"
import { useState } from "react"
import useMenu from "./useMenu"

const autoHeight = true
const density: GridDensity = "compact"
const pagination = true as const
const rowsPerPageOptions = [5, 10, 20]

type Actions<T> = {
  onAdd: () => void
  onEdit: (value: T) => void
  onDelete: (value: T) => void
}

const useDataGrid = <T,>(
  query: T[] | Promise<T[]>,
  { onAdd: handleAdd, onEdit: handleEdit, onDelete: handleDelete }: Actions<T>,
) => {
  // rows
  const data = useLiveQuery<T[]>(() => query, [])
  const rows = data ?? []
  const loading = !data

  // actions
  const { anchorEl, anchorOrigin, open, handleClose, handleOpen } = useMenu()
  const actions: GridColDef = {
    field: "Actions",
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
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={anchorOrigin}
          onClick={handleClose}
        >
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
  }

  // pagination
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const onPageChange = (value: number) => {
    setPage(value)
  }
  const onPageSizeChange = (value: number) => {
    setPageSize(value)
  }

  return {
    actions,
    autoHeight,
    density,
    rows,
    loading,
    pagination,
    page,
    pageSize,
    rowsPerPageOptions,
    onPageChange,
    onPageSizeChange,
  }
}

export default useDataGrid
