import "@fullcalendar/react/dist/vdom" // https://github.com/fullcalendar/fullcalendar-react/issues/150
import FullCalendar, { DatesSetArg, EventInput } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ServiceSchedulerToolbar, {
  ServiceSchedulerToolbarProps,
} from "./ServiceSchedulerToolbar"
import { useLiveQuery } from "dexie-react-hooks"
import database from "../database"
import { Palette, useTheme } from "@mui/material"

const DEFAULT_VIEW = "dayGridMonth"

/**
 *
 * @param status
 * @param palette
 * @returns [backgroundColor, borderColor, textColor]
 */
const getColorsFromStatus = (status: ServiceStatus, palette: Palette) => {
  switch (status) {
    case "pending":
      return [palette.info.main, palette.info.main, "white"]
    case "active":
      return [palette.success.main, palette.success.main, "white"]
    case "completed":
      return [palette.secondary.main, palette.secondary.main, "white"]
    case "delivered":
      return ["white", palette.info.main, palette.info.main]
    case "issue":
    default:
      return [palette.error.main, palette.error.main, "white"]
  }
}

const getEventsFromService = (
  service: Service[],
  palette: Palette,
): EventInput[] => {
  return Object.entries(
    service.reduce((result, service) => {
      const { date, status } = service
      if (!result[date]) result[date] = {}
      if (!result[date][status]) result[date][status] = []
      result[date][status].push(service)
      return result
    }, {} as { [key: string]: { [key: string]: Service[] } }),
  )
    .map(([date, service]) =>
      Object.entries(service).map(([status, service]): EventInput => {
        const [backgroundColor, borderColor, textColor] = getColorsFromStatus(
          status as ServiceStatus,
          palette,
        )
        return {
          id: `${date}-${status}`,
          title: `${status} - ${service.length}`,
          date,
          backgroundColor,
          borderColor,
          textColor,
        }
      }),
    )
    .flat()
}

const ServiceScheduler = () => {
  // toolbar
  const [toolbar, setToolbar] = useState<ServiceSchedulerToolbarProps>()

  // service
  const [range, setRange] = useState<string[]>(["", ""])
  const service =
    useLiveQuery(() => {
      const [start, end] = range
      if (!start || !end) return []
      return database.service
        .where("date")
        .between(start, end, true, true)
        .toArray()
    }, [range]) ?? []

  // events
  const { palette } = useTheme()
  const events = service ? getEventsFromService(service, palette) : []
  console.log(events)

  // toggle page/view
  const handleDatesSet = ({
    view: { title, type, calendar },
    startStr,
    endStr,
  }: DatesSetArg) => {
    setToolbar({ title, type, calendar })
    setRange([startStr.split("T")[0], endStr.split("T")[0]])
  }

  // service viewer
  const navigate = useNavigate()
  const handleDateClick = ({ date }: DateClickArg) => {
    navigate(`/service/${date.toISOString().split("T")[0]}`)
  }

  return (
    <>
      <ServiceSchedulerToolbar {...toolbar} />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={DEFAULT_VIEW}
        datesSet={handleDatesSet}
        dateClick={handleDateClick}
        headerToolbar={false}
        events={events}
      />
    </>
  )
}

export default ServiceScheduler
