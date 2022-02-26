import "@fullcalendar/react/dist/vdom" // https://github.com/fullcalendar/fullcalendar-react/issues/150
import FullCalendar, { DatesSetArg, EventInput } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import { Palette, useTheme } from "@mui/material"
import {
  ServiceSchedulerMetadata,
  ServiceSchedulerView,
} from "./ServiceScheduler"

type ServiceCalendarView = "dayGridWeek" | "dayGridMonth"

const getViewFromType = (type: ServiceCalendarView): ServiceSchedulerView => {
  switch (type) {
    case "dayGridWeek":
      return "week"
    case "dayGridMonth":
      return "month"
    default:
      return "day"
  }
}

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

type ServiceCalendarProps = {
  service: Service[]
  onChangeDate: (date: Date) => void
  onChangeMetadata: (metadata: ServiceSchedulerMetadata) => void
}

const ServiceCalendar = ({
  service,
  onChangeDate: handleChangeDate,
  onChangeMetadata: handleChangeMetadata,
}: ServiceCalendarProps): JSX.Element => {
  // events
  console.log(service)
  const { palette } = useTheme()
  const events = service ? getEventsFromService(service, palette) : []

  const handleDateClick = ({ date }: DateClickArg) => handleChangeDate(date)
  const handleDatesSet = ({
    view: { title, type, calendar },
    start: startDate,
    end: endDate,
  }: DatesSetArg) =>
    handleChangeMetadata({
      title,
      startDate,
      endDate,
      view: getViewFromType(type as ServiceCalendarView),
      calendar,
    })

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      datesSet={handleDatesSet}
      dateClick={handleDateClick}
      headerToolbar={false}
      events={events}
    />
  )
}

export default ServiceCalendar
