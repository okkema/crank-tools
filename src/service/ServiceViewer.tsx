import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material"
import { useParams } from "react-router-dom"
import ServiceDetailTable from "./ServiceDetailTable"
import { useServiceContext } from "./ServiceProvider"
import { useEffect } from "react"
import { parse, startOfDay, endOfDay, isValid } from "date-fns"
import { ServiceStatusChip } from "./ServiceStatusChip"
import Loading from "../shared/Loading"

const renderTitle = (
  customer: string | Customer | undefined,
  index: number,
) => {
  if (!customer) return `Service ${index + 1}`
  if (typeof customer === "string") return customer
  return customer.name
}

const ServiceViewer = (): JSX.Element => {
  const {
    service: { loading, values },
    view: { type, onChangeView: handleChangeView },
  } = useServiceContext()
  // parameters
  const { date } = useParams<{ date: string }>()
  useEffect(() => {
    if (date && isValid(date)) {
      const start = parse(date, "yyyy-MM-dd", new Date())
      handleChangeView({
        type: "day",
        start: startOfDay(start),
        end: endOfDay(start),
      })
    }
  }, [date, type, handleChangeView])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        values.map((service, index) => {
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
                  <ServiceStatusChip status={status} />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <ServiceDetailTable details={details} selectable />
              </AccordionDetails>
            </Accordion>
          )
        })
      )}
    </>
  )
}

export default ServiceViewer
