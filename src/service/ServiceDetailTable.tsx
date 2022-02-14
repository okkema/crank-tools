import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { AddCircle, Delete, Edit } from "@mui/icons-material"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import ServiceDetailModal from "./ServiceDetailModal"
import { v4 as uuid } from "uuid"

const calculateTotal = (details: ServiceDetail[]) =>
  details.reduce((total, { amount }) => total + +amount, 0)

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

type ServiceDetailProps = {
  details: ServiceDetail[]
}

const ServiceDetail = ({ details }: ServiceDetailProps) => {
  // rows
  const [rows, setRows] = useState<ServiceDetail[]>(details)

  // selected
  const [selected, setSelected] = useState<string[]>([])
  const isSelected = (id: string) => selected.includes(id)
  const isAllSelected = selected.length === rows.length

  // total
  const [total, setTotal] = useState(0)
  useEffect(() => {
    setTotal(calculateTotal(rows))
  }, [JSON.stringify(rows)])

  // dialog
  const [open, setOpen] = useState(false)
  const { values, handleChange, setValues, handleSubmit } =
    useFormik<ServiceDetail>({
      initialValues: {} as ServiceDetail,
      onSubmit: (values) => {
        if (!values.id) {
          values.id = uuid()
          setRows([...rows, values])
        } else {
          const index = rows.findIndex((detail) => detail.id === values.id)
          rows[index] = values
          setRows(rows)
        }
        setOpen(false)
      },
    })

  // handlers
  const handleAdd = () => {
    setValues({} as ServiceDetail)
    setOpen(true)
  }
  const handleDelete = async (detail: ServiceDetail) => {
    setRows(rows.filter(({ id }) => detail.id !== id))
  }
  const handleEdit = (detail: ServiceDetail) => {
    setValues(detail)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelected([])
    } else {
      setSelected(rows.map(({ id }) => id))
    }
  }
  const handleSelect = (id: string) => {
    if (isSelected(id)) {
      setSelected(selected.filter((value) => value !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">
                <IconButton onClick={handleAdd} color="success">
                  <AddCircle />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((detail, index) => {
              const { description, amount, id } = detail
              return (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(id)}
                      onChange={() => handleSelect(id)}
                    />
                  </TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell align="right">
                    {formatter.format(amount)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleDelete(detail)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(detail)} color="info">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCell colSpan={2} align="right" variant="head">
                Total
              </TableCell>
              <TableCell align="right">{formatter.format(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ServiceDetailModal
        open={open}
        detail={values}
        onClose={handleClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default ServiceDetail
