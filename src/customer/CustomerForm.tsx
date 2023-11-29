import { Button, Stack, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"

const CustomerSchema = Yup.object().shape({
  id: Yup.string().uuid(),
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
})

export const DefaultCustomer: Customer = {
  id: "",
  name: "",
  email: "",
  phone: "",
}

type CustomerFormProps = {
  customer?: Customer
  onSubmit: (customer: Customer) => void
  onCancel: () => void
}

export function CustomerForm({
  customer,
  onCancel,
  onSubmit,
}: CustomerFormProps): JSX.Element {
  const {
    values: { name, email, phone },
    handleChange,
    setValues,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid,
  } = useFormik<Customer>({
    initialValues: DefaultCustomer,
    onSubmit,
    validationSchema: CustomerSchema,
  })

  useEffect(() => {
    setValues(customer ?? DefaultCustomer)
  }, [customer, setValues])

  return (
    <Stack spacing={2}>
      <Typography variant="h6">{customer ? "Edit" : "Add"} Customer</Typography>
      <TextField
        name="name"
        value={name}
        label="Name"
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={touched.name && !!errors.name}
      />
      <TextField
        name="email"
        value={email}
        label="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={touched.email && !!errors.email}
      />
      <TextField
        name="phone"
        value={phone}
        label="Phone Number"
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={touched.phone && !!errors.phone}
      />
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!isValid}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  )
}
