import {
  AccountCircle,
  AddCircle,
  BuildCircle,
  CheckCircle,
  Error,
  Help,
  Pending,
} from "@mui/icons-material"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ServiceDetailTable from "./ServiceDetailTable"
import { v4 as uuid } from "uuid"
import ServiceModal from "./ServiceModal"
import database from "../database"

const renderTitle = (
  customer: string | Customer | undefined,
  index: number,
) => {
  if (!customer) return `Service ${index + 1}`
  if (typeof customer === "string") return customer
  return customer.name
}

const renderStatus = (status: ServiceStatus) => {
  switch (status) {
    case "pending":
      return <Chip color="info" icon={<Pending />} label={status} />
    case "active":
      return <Chip color="success" icon={<BuildCircle />} label={status} />
    case "issue":
      return <Chip color="error" icon={<Error />} label={status} />
    case "completed":
      return <Chip color="secondary" icon={<CheckCircle />} label={status} />
    case "delivered":
      return (
        <Chip
          color="info"
          variant="outlined"
          icon={<AccountCircle />}
          label={status}
        />
      )
    default:
      return <Chip icon={<Help />} label="unknown" />
  }
}

const ServiceViewer = (): JSX.Element => {
  // parameters
  const { date } = useParams<{ date: string }>()

  // service
  const [service, setService] = useState<Service[]>([])
  const fetchService = async () => {
    if (date) {
      const service = await database.service
        .where("date")
        .equals(date)
        .toArray()
      setService(service)
    }
  }
  useEffect(() => {
    fetchService()
  }, [])

  // modal
  const [open, setOpen] = useState(false)
  const { values, handleChange, setValues, handleSubmit } = useFormik<Service>({
    initialValues: {} as Service,
    onSubmit: async (service) => {
      if (!service.id) {
        service.id = uuid()
        service.details = []
        service.status = "pending"
        if (date) service.date = date
        await database.service.put(service, service.id)
      }
      fetchService()
      setOpen(false)
    },
  })
  const [customers, setCustomers] = useState<Customer[]>([])
  useEffect(() => {
    ;(async () => {
      const customers = await database.customers.toArray()
      setCustomers(customers)
    })()
  }, [])

  // handlers
  const handleAdd = () => {
    setValues({} as Service)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Stack spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{date}</Typography>
          <Button
            variant="contained"
            startIcon={<AddCircle />}
            onClick={handleAdd}
          >
            Add Service
          </Button>
        </Stack>
        <Box>
          {service.map((service, index) => {
            const { id, status, details } = service
            return (
              <Accordion key={id}>
                <AccordionSummary>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography>{renderTitle(undefined, index)}</Typography>
                    <Box>{renderStatus(status)}</Box>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <ServiceDetailTable details={details} />
                </AccordionDetails>
              </Accordion>
            )
          })}
        </Box>
      </Stack>
      <ServiceModal
        open={open}
        service={values}
        customers={customers}
        onChange={handleChange}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default ServiceViewer
