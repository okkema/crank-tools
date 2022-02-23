import { Autocomplete, TextField } from "@mui/material"
import { useLiveQuery } from "dexie-react-hooks"
import { FocusEvent } from "react"

type CustomerComboboxProps = {
  customers: Customer[] | Promise<Customer[]>
  onChange: (customer: Customer | null) => void
  onBlur: (event: FocusEvent) => void
  name?: string
  label?: string
  error?: boolean
  required?: boolean
}

const CustomerCombobox = ({
  customers,
  onChange: handleChange,
  onBlur: handleBlur,
  name = "customer",
  label = "Customer",
  required = false,
  error = false,
}: CustomerComboboxProps): JSX.Element => {
  const options = useLiveQuery(() => customers)
  return (
    <Autocomplete
      onBlur={handleBlur}
      options={options ?? []}
      getOptionLabel={(option) => option.name}
      onChange={(event, value) => handleChange(value)}
      renderInput={(props) => (
        <TextField
          name={name}
          label={label}
          required={required}
          error={error}
          {...props}
        />
      )}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  )
}

export default CustomerCombobox
