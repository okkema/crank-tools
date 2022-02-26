import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ServiceToolbar from "./ServiceToolbar"
import { useLiveQuery } from "dexie-react-hooks"
import database from "../database"
import ServiceCalendar from "./ServiceCalendar"
import { CalendarApi } from "@fullcalendar/react"

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

const getKeyFromDate = (date: Date) => date.toISOString().split("T")[0]

const ServiceScheduler = () => {
  // metadata
  const [{ calendar, title, view, startDate, endDate }, setMetadata] =
    useState<ServiceSchedulerMetadata>(DEFAULT)
  const handleChangeMetadata = (metadata: ServiceSchedulerMetadata) => {
    setMetadata(metadata)
  }

  // toolbar
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
          .between(
            getKeyFromDate(startDate),
            getKeyFromDate(endDate),
            true,
            true,
          )
          .toArray(),
      [startDate, endDate],
    ) ?? []

  // service viewer
  const navigate = useNavigate()
  const handleChangeDate = (date: Date) => {
    navigate(`/service/${getKeyFromDate(date)}`)
  }

  return (
    <>
      <ServiceToolbar
        title={title}
        view={view}
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
    </>
  )
}

export default ServiceScheduler
