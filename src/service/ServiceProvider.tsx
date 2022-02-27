import { CalendarApi } from "@fullcalendar/react"
import { useLiveQuery } from "dexie-react-hooks"
import { createContext, useContext, useState } from "react"
import database from "../database"
import { v4 as uuid } from "uuid"
import { useNavigate } from "react-router-dom"

const TODAY = new Date()

export const getKeyFromDate = (date: Date) => date.toISOString().split("T")[0]

export type ServiceViewType = "day" | "week" | "month"

export type ServiceView = {
  type: ServiceViewType
  start: Date
  end: Date
}

const DEFAULT: ServiceView = {
  type: "day",
  start: TODAY,
  end: TODAY,
}

export type ServiceContext = {
  view: ServiceView & {
    onChangeView: (view: ServiceView) => void
  }
  service: Service[]
  toolbar: {
    title: string
    onChangeTitle: (title: string) => void
    onClickAdd: () => void
    onClickToday: () => void
    onClickWeek: () => void
    onClickMonth: () => void
    onClickPrev: () => void
    onClickNext: () => void
  }
  calendar: {
    api?: CalendarApi
    onChangeApi: (api: CalendarApi) => void
    onClickDate: (date: Date) => void
  }
  form: {
    open: boolean
    onSubmit: (service: Service) => void
    onCancel: () => void
  }
}

const ServiceContext = createContext<ServiceContext | undefined>(undefined)

export const useServiceContext = () => {
  const context = useContext(ServiceContext)
  if (!context)
    throw new Error("useServiceContext must be used within ServiceProvider")
  return context
}

type ServiceProviderProps = {
  children: JSX.Element
}

const ServiceProvider = ({ children }: ServiceProviderProps): JSX.Element => {
  // view
  const [view, setView] = useState(DEFAULT)
  const handleChangeView = (view: ServiceView) => {
    setView(view)
  }

  // service
  const { start, end } = view
  const service =
    useLiveQuery(
      () =>
        database.service
          .where("date")
          .between(start, end, true, true)
          .toArray(),
      [start, end],
    ) ?? []

  // calendar
  const navigate = useNavigate()
  const [api, setApi] = useState<CalendarApi>()
  const handleChangeApi = (api: CalendarApi) => {
    setApi(api)
  }
  const handleClickDate = (date: Date) => {
    navigate(`/service/${getKeyFromDate(date)}`)
  }

  // form
  const [open, setOpen] = useState(false)
  const handleSubmit = async (service: Service) => {
    if (!service.id) service.id = uuid()
    await database.service.put(service)
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  // toolbar
  const { type } = view
  const [title, setTitle] = useState(TODAY.toISOString())
  const handleChangeTitle = (title: string) => {
    setTitle(title)
  }
  const handleClickAdd = () => {
    setOpen(true)
  }
  const handleClickToday = () => {
    if (type === "day") {
      console.log("today")
    } else {
      api?.today()
    }
  }
  const handleClickWeek = () => {
    if (type === "day") {
      console.log("week")
    } else {
      api?.changeView("dayGridWeek")
    }
  }
  const handleClickMonth = () => {
    if (type === "day") {
      console.log("month")
    } else {
      api?.changeView("dayGridMonth")
    }
  }
  const handleClickPrev = () => {
    if (type === "day") {
      console.log("prev")
    } else {
      api?.prev()
    }
  }
  const handleClickNext = () => {
    if (type === "day") {
      console.log("next")
    } else {
      api?.next()
    }
  }

  // context
  const context: ServiceContext = {
    view: {
      ...view,
      onChangeView: handleChangeView,
    },
    service,
    toolbar: {
      title,
      onChangeTitle: handleChangeTitle,
      onClickAdd: handleClickAdd,
      onClickToday: handleClickToday,
      onClickWeek: handleClickWeek,
      onClickMonth: handleClickMonth,
      onClickPrev: handleClickPrev,
      onClickNext: handleClickNext,
    },
    calendar: {
      api,
      onChangeApi: handleChangeApi,
      onClickDate: handleClickDate,
    },
    form: {
      open,
      onSubmit: handleSubmit,
      onCancel: handleCancel,
    },
  }

  return (
    <ServiceContext.Provider value={context}>
      {children}
    </ServiceContext.Provider>
  )
}

export default ServiceProvider
