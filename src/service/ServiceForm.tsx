import { Box, Button, Drawer, Stack, Typography } from "@mui/material"
import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"
import CustomerCombobox from "../customer/CustomerCombobox"
import ServiceDetailTable from "./ServiceDetailTable"
import { v4 as uuid } from "uuid"
import { useServiceContext } from "./ServiceProvider"

const validationSchema = Yup.object().shape({
  id: Yup.string().uuid(),
  date: Yup.date().required(),
  details: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().uuid().required(),
        description: Yup.string().required(),
        amount: Yup.string().required(),
      }),
    )
    .min(1),
  customer: Yup.string().uuid().required(),
})

const initialValues: Service = {
  id: "",
  date: new Date(),
  status: "pending",
  details: [
    {
      id: uuid(),
      description: "",
      amount: "",
    },
  ],
  customer: "",
}

type ServiceFormProps = {
  date?: Date
  customers: Customer[] | Promise<Customer[]>
}

const ServiceForm = ({ date, customers }: ServiceFormProps): JSX.Element => {
  const {
    form: { open, onCancel, onSubmit },
  } = useServiceContext()

  const {
    values: { details },
    setFieldValue,
    handleBlur,
    handleSubmit,
    isValid,
    errors,
    touched,
    setValues,
    handleChange,
  } = useFormik<Service>({
    initialValues,
    onSubmit,
    validationSchema,
  })

  useEffect(() => {
    setValues({ ...initialValues })
  }, [setValues, date])

  const handleAdd = () => {
    setValues((values) => ({
      ...values,
      details: [...values.details, { id: uuid(), description: "", amount: "" }],
    }))
  }
  const handleDelete = (detail: ServiceDetail) => {
    setValues((values) => ({
      ...values,
      details: values.details.filter(({ id }) => detail.id !== id),
    }))
  }

  return (
    <Drawer
      open={open}
      onClose={onCancel}
      anchor="right"
      PaperProps={{ sx: { width: "1000px", maxWidth: "100vw" } }}
    >
      <Box height={"100%"} padding={2}>
        <Stack spacing={2}>
          <Typography variant="h6">Add Service</Typography>
          <CustomerCombobox
            customers={customers}
            onChange={(customer) => setFieldValue("customer", customer?.id)}
            onBlur={handleBlur}
            required
            error={touched.customer && !!errors.customer}
          />
          <ServiceDetailTable
            details={details}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.details}
            errors={errors.details}
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
      </Box>
    </Drawer>
  )
}

export default ServiceForm
