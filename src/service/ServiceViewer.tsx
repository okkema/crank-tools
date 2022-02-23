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
  CircularProgress,
  Drawer,
  Stack,
  Typography,
} from "@mui/material"
import { useParams } from "react-router-dom"
import ServiceDetailTable from "./ServiceDetailTable"
import { v4 as uuid } from "uuid"
import database from "../database"
import ServiceForm from "./ServiceForm"
import { useLiveQuery } from "dexie-react-hooks"
import { useState } from "react"

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
  const service = useLiveQuery(() =>
    database.service.where("date").equals(date!).toArray(),
  )

  // form
  const [open, setOpen] = useState(false)
  const handleAdd = () => {
    setOpen(true)
  }
  const handleSubmit = async (service: Service) => {
    if (!service.id) service.id = uuid()
    await database.service.put(service)
    setOpen(false)
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
          {!service && <CircularProgress />}
          {service &&
            service.map((service, index) => {
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
      <Drawer open={open} onClose={handleClose} anchor="right">
        <Box height={"100%"} padding={2}>
          <ServiceForm
            date={date!}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </Box>
      </Drawer>
    </>
  )
}

export default ServiceViewer
