import {
  AccountCircle,
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
  Chip,
  Stack,
  Typography,
} from "@mui/material"
import { useParams } from "react-router-dom"
import ServiceDetailTable from "./ServiceDetailTable"
import { useServiceContext } from "./ServiceProvider"
import { useEffect } from "react"
import { parse, startOfDay, endOfDay } from "date-fns"

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
  console.log("ServiceViewer")
  const {
    service,
    view: { onChangeView: handleChangeView },
  } = useServiceContext()
  // parameters
  const { date } = useParams<{ date: string }>()
  useEffect(() => {
    if (date) {
      const start = parse(date, "yyyy-MM-dd", new Date())
      handleChangeView({
        type: "day",
        start: startOfDay(start),
        end: endOfDay(start),
      })
    }
  }, [date, handleChangeView])

  return (
    <>
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
                <ServiceDetailTable details={details} selectable />
              </AccordionDetails>
            </Accordion>
          )
        })}
    </>
  )
}

export default ServiceViewer
