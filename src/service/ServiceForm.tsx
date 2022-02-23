import { Button, Stack, Typography } from "@mui/material"
import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"
import CustomerCombobox from "../customer/CustomerCombobox"

const validationSchema = Yup.object().shape({
  id: Yup.string().uuid(),
  date: Yup.string().required(),
  customer: Yup.string().uuid().required(),
})

const initialValues: Service = {
  id: "",
  date: "",
  status: "pending",
  details: [],
  customer: "",
}

const options = [
  {
    name: "Ben Okkema",
    id: "b314ceea-ea39-42a0-b617-c85715ad23ac",
  },
  {
    name: "Yayi Saavedra",
    id: "1e02ec42-8c96-4039-853c-f72bdf108201",
  },
] as Customer[]

type ServiceFormProps = {
  date: string
  onSubmit: (service: Service) => void
  onCancel: () => void
}

const ServiceForm = ({
  date,
  onCancel,
  onSubmit,
}: ServiceFormProps): JSX.Element => {
  const {
    setFieldValue,
    handleBlur,
    handleSubmit,
    isValid,
    errors,
    touched,
    setValues,
  } = useFormik<Service>({
    initialValues,
    onSubmit,
    validationSchema,
  })

  useEffect(() => {
    setValues({ ...initialValues, date })
  }, [setValues, date])

  return (
    <Stack spacing={2} width="600px" maxWidth="100vw">
      <Typography variant="h6">Add Service</Typography>
      <CustomerCombobox
        customers={options}
        onChange={(customer) => setFieldValue("customer", customer?.id)}
        onBlur={handleBlur}
        required
        error={touched.customer && !!errors.customer}
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

export default ServiceForm
