import { DataGrid, GridColDef } from "@mui/x-data-grid"
import useDataGrid from "../shared/useDataGrid"

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
]

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
  // datagrid
  const { actions, ...datagrid } = useDataGrid(customers, {
    onAdd: handleAdd,
    onEdit: handleEdit,
    onDelete: handleDelete,
  })

  return <DataGrid columns={[...columns, actions]} {...datagrid} />
}

export default CustomerTable
