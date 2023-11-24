import FullCalendar from "@fullcalendar/react"
import { DatesSetArg, EventInput } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import { Palette, useTheme } from "@mui/material"
import {
  getKeyFromDate,
  ServiceViewType,
  useServiceContext,
} from "./ServiceProvider"

type ServiceCalendarView = "dayGridWeek" | "dayGridMonth"

const getViewFromType = (type: ServiceCalendarView): ServiceViewType => {
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
    service.reduce(
      (result, service) => {
        const { date, status } = service
        const key = getKeyFromDate(date)
        if (!result[key]) result[key] = {}
        if (!result[key][status]) result[key][status] = []
        result[key][status].push(service)
        return result
      },
      {} as { [key: string]: { [key: string]: Service[] } },
    ),
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

const ServiceCalendar = (): JSX.Element => {
  const {
    view: { onChangeView: handleChangeView, type, start },
    service: { values: service },
    toolbar: { onChangeTitle: handleChangeTitle },
    calendar: { onClickDate: handleClickDate, onChangeApi: handleChangeApi },
  } = useServiceContext()
  const initialView = type === "month" ? "dayGridMonth" : "dayGridWeek"

  // events
  const { palette } = useTheme()
  const events = getEventsFromService(service, palette)

  // view
  const handleDateClick = ({ date }: DateClickArg) => handleClickDate(date)
  const handleDatesSet = ({
    view: { title, type, calendar: api },
    start,
    end,
  }: DatesSetArg) => {
    handleChangeTitle(title)
    handleChangeView({
      type: getViewFromType(type as ServiceCalendarView),
      start,
      end,
    })
    handleChangeApi(api)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView={initialView}
      initialDate={start}
      datesSet={handleDatesSet}
      dateClick={handleDateClick}
      headerToolbar={false}
      events={events}
    />
  )
}

export default ServiceCalendar
