import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import CustomerCombobox from "../customer/CustomerCombobox"
import ServiceDetailTable from "./ServiceDetailTable"
import { v4 as uuid } from "uuid"
import { useServiceContext } from "./ServiceProvider"
import { DatePicker } from "@mui/lab"
import { startOfDay } from "date-fns"
import ServiceStatusChip from "./ServiceStatusChip"
import database from "../database"
import { useEffect } from "react"

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
  date: startOfDay(new Date()),
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

const statuses: ServiceStatus[] = [
  "pending",
  "active",
  "issue",
  "completed",
  "delivered",
]

const ServiceForm = (): JSX.Element => {
  const {
    form: { open, onCancel, onSubmit, date: selectedDate },
  } = useServiceContext()

  const {
    values: { details, date, status },
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

  const customers = database.customers.orderBy("name").toArray()

  useEffect(() => {
    setValues({ ...initialValues, date: selectedDate })
  }, [selectedDate, setValues])

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
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <DatePicker
              label="Date"
              value={date}
              onChange={(date: unknown) => {
                setFieldValue("date", date)
              }}
              // @ts-expect-error TODO change unknown
              renderInput={(params: unknown) => <TextField {...params} />}
            />
            <FormControl variant="outlined" sx={{ width: "160px" }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                input={<OutlinedInput label="Status" />}
                value={status}
                onChange={handleChange}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    <ServiceStatusChip status={status} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
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
