import "@fullcalendar/react/dist/vdom" // https://github.com/fullcalendar/fullcalendar-react/issues/150
import FullCalendar, { DatesSetArg, ToolbarInput } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const DEFAULT_VIEW = "dayGridMonth"

const DEFAULT_TOOLBAR: ToolbarInput = {
  left: "today prev,next",
  center: "title",
  right: "dayGridWeek",
}

const ServiceScheduler = () => {
  // header toolbar
  const [headerToolbar, setHeaderToolbar] =
    useState<ToolbarInput>(DEFAULT_TOOLBAR)
  const changeHeaderToolbar = (type: string) => {
    if (type === "dayGridWeek") {
      setHeaderToolbar({
        ...DEFAULT_TOOLBAR,
        right: "dayGridMonth",
      })
    } else {
      setHeaderToolbar(DEFAULT_TOOLBAR)
    }
  }

  // handlers
  const navigate = useNavigate()
  const handleDatesSet = ({ view: { type } }: DatesSetArg) => {
    changeHeaderToolbar(type)
  }
  const handleDateClick = ({ date }: DateClickArg) => {
    navigate(`/service/${date.toISOString().split("T")[0]}`)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView={DEFAULT_VIEW}
      datesSet={handleDatesSet}
      dateClick={handleDateClick}
      headerToolbar={headerToolbar}
    />
  )
}

export default ServiceScheduler
