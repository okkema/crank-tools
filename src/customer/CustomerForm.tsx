import { Button, Stack, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useEffect } from "react"

type CustomerFormProps = {
  customer?: Customer
  onSubmit: (customer: Customer) => void
  onCancel: () => void
}

const DEFAULT: Customer = {
  id: "",
  name: "",
  email: "",
  phone: "",
}

const CustomerForm = ({ customer, onCancel, onSubmit }: CustomerFormProps) => {
  const {
    values: { name, email, phone },
    handleChange,
    setValues,
    handleSubmit,
  } = useFormik<Customer>({
    initialValues: DEFAULT,
    onSubmit,
  })

  useEffect(() => {
    setValues(customer ?? DEFAULT)
  }, [customer, setValues])

  return (
    <Stack spacing={2}>
      <TextField
        value={name}
        label="Name"
        onChange={handleChange}
        name="name"
      />
      <TextField
        value={email}
        label="Email"
        onChange={handleChange}
        name="email"
      />
      <TextField
        value={phone}
        label="Phone Number"
        onChange={handleChange}
        name="phone"
      />
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Stack>
    </Stack>
  )
}

export default CustomerForm
