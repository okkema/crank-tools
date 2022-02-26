import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ServiceToolbar from "./ServiceToolbar"
import { useLiveQuery } from "dexie-react-hooks"
import database from "../database"
import ServiceCalendar from "./ServiceCalendar"
import { CalendarApi } from "@fullcalendar/react"
import { Box, Drawer } from "@mui/material"
import ServiceForm from "./ServiceForm"
import { v4 as uuid } from "uuid"

export type ServiceSchedulerView = "day" | "week" | "month"

export type ServiceSchedulerMetadata = {
  title: string
  view: ServiceSchedulerView
  startDate: Date
  endDate: Date
  calendar?: CalendarApi
}

const TODAY = new Date()

const DEFAULT: ServiceSchedulerMetadata = {
  title: TODAY.toString(),
  view: "month",
  startDate: TODAY,
  endDate: TODAY,
}

export const getKeyFromDate = (date: Date) => date.toISOString().split("T")[0]

const ServiceScheduler = () => {
  // metadata
  const [{ calendar, title, view, startDate, endDate }, setMetadata] =
    useState<ServiceSchedulerMetadata>(DEFAULT)
  const handleChangeMetadata = (metadata: ServiceSchedulerMetadata) => {
    setMetadata(metadata)
  }

  // toolbar
  const handleClickAdd = () => {
    setOpen(true)
  }
  const handleClickToday = () => {
    calendar?.today()
  }
  const handleClickWeek = () => {
    calendar?.changeView("dayGridWeek")
  }
  const handleClickMonth = () => {
    calendar?.changeView("dayGridMonth")
  }
  const handleClickPrev = () => {
    calendar?.prev()
  }
  const handleClickNext = () => {
    calendar?.next()
  }

  // service
  const service =
    useLiveQuery(
      () =>
        database.service
          .where("date")
          .between(startDate, endDate, true, true)
          .toArray(),
      [startDate, endDate],
    ) ?? []

  // service viewer
  const navigate = useNavigate()
  const handleChangeDate = (date: Date) => {
    navigate(`/service/${getKeyFromDate(date)}`)
  }

  // customers
  const customers = database.customers.orderBy("name").toArray()

  // form
  const [open, setOpen] = useState(false)
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
      <ServiceToolbar
        title={title}
        view={view}
        onClickAdd={handleClickAdd}
        onClickToday={handleClickToday}
        onClickWeek={handleClickWeek}
        onClickMonth={handleClickMonth}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      />
      <ServiceCalendar
        service={service}
        onChangeDate={handleChangeDate}
        onChangeMetadata={handleChangeMetadata}
      />
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="right"
        PaperProps={{ sx: { width: "1000px", maxWidth: "100vw" } }}
      >
        <Box height={"100%"} padding={2}>
          <ServiceForm
            customers={customers ?? []}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </Box>
      </Drawer>
    </>
  )
}

export default ServiceScheduler
