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
import { AddCircle } from "@mui/icons-material"
import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useState,
} from "react"
import { FormikErrors, FormikTouched } from "formik"
import ServiceDetailTableRow from "./ServiceDetailTableRow"

const calculateTotal = (details: ServiceDetail[]) =>
  details.reduce((total, { amount }) => total + +amount, 0)

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

type ServiceDetailProps = {
  details: ServiceDetail[]
  selectable?: boolean
  onAdd?: () => void
  onDelete?: (detail: ServiceDetail) => void
  onChange?: (event: ChangeEvent) => void
  onBlur?: (event: FocusEvent) => void
  touched?: FormikTouched<ServiceDetail[]>
  errors?: FormikErrors<ServiceDetail[]> | string[] | string
}

const ServiceDetailTable = ({
  details,
  onAdd: handleAdd,
  onDelete: handleDelete,
  onChange: handleChange,
  onBlur: handleBlur,
  selectable = false,
  touched,
  errors,
}: ServiceDetailProps) => {
  // selected
  const [selected, setSelected] = useState<string[]>([])
  const handleSelectAll = useCallback(() => {
    setSelected((selected) => {
      if (selected.length === details.length) {
        return []
      } else {
        return details.map(({ id }) => id)
      }
    })
  }, [details])
  const handleSelect = ({ id }: ServiceDetail) => {
    setSelected((selected) => {
      if (selected.includes(id)) {
        return selected.filter((value) => value !== id)
      } else {
        return [...selected, id]
      }
    })
  }

  // total
  const [total, setTotal] = useState(0)
  useEffect(() => {
    setTotal(calculateTotal(details))
  }, [JSON.stringify(details)])

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    !!details.length && selected.length === details.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
            )}
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            {handleAdd && (
              <TableCell align="right">
                <IconButton onClick={handleAdd} color="success">
                  <AddCircle />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail, index) => (
            <ServiceDetailTableRow
              key={detail.id}
              detail={detail}
              name={`details[${index}]`}
              selectable={selectable}
              selected={selected.includes(detail.id)}
              touched={touched?.[index]}
              errors={errors?.[index]}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
          <TableRow>
            <TableCell
              colSpan={selectable ? 2 : 1}
              align="right"
              variant="head"
            >
              Total
            </TableCell>
            <TableCell align="right">{formatter.format(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ServiceDetailTable
