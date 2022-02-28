import { Delete } from "@mui/icons-material"
import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material"
import { FormikErrors, FormikTouched } from "formik"
import { ChangeEvent, FocusEvent } from "react"
import CurrencyInput from "../shared/CurrencyInput"

type ServiceDetailTableRowProps = {
  detail: ServiceDetail
  name: string
  selectable?: boolean
  selected?: boolean
  touched?: FormikTouched<ServiceDetail>
  errors?: FormikErrors<ServiceDetail> | string
  onSelect?: (detail: ServiceDetail) => void
  onDelete?: (detail: ServiceDetail) => void
  onChange?: (event: ChangeEvent) => void
  onBlur?: (event: FocusEvent) => void
}

const ServiceDetailTableRow = ({
  detail,
  name,
  selectable,
  selected,
  touched,
  errors,
  onSelect: handleSelect,
  onDelete: handleDelete,
  onChange: handleChange,
  onBlur: handleBlur,
}: ServiceDetailTableRowProps): JSX.Element => {
  const descriptionError =
    touched?.description && typeof errors !== "string" && !!errors?.description
  const amountError =
    touched?.amount && typeof errors !== "string" && !!errors?.amount

  return (
    <TableRow>
      {selectable && handleSelect && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={() => handleSelect(detail)} />
        </TableCell>
      )}
      <TableCell>
        <TextField
          name={`${name}.description`}
          value={detail.description}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={descriptionError}
          fullWidth
        />
      </TableCell>
      <TableCell align="right">
        <CurrencyInput
          name={`${name}.amount`}
          value={detail.amount}
          onChange={handleChange}
          onBlur={handleBlur}
          sx={{ width: "100px" }}
          error={amountError}
        />
      </TableCell>
      {handleDelete && (
        <TableCell align="right">
          <IconButton onClick={() => handleDelete(detail)} color="error">
            <Delete />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}

export default ServiceDetailTableRow
