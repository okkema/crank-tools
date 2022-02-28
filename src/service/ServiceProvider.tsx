import { CalendarApi } from "@fullcalendar/react"
import { useLiveQuery } from "dexie-react-hooks"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import database from "../database"
import { v4 as uuid } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns"

export const getKeyFromDate = (date: Date) => date.toISOString().split("T")[0]

const getTitleFromDate = (date: Date) => {
  const [weekday, month, day, year] = date.toString().split(" ")
  return `${weekday} ${month} ${day}, ${year}`
}

export type ServiceViewType = "day" | "week" | "month"

export type ServiceView = {
  type: ServiceViewType
  start: Date
  end: Date
}

export type ServiceContext = {
  view: ServiceView & {
    onChangeView: (view: ServiceView) => void
  }
  service: {
    loading: boolean
    values: Service[]
  }
  toolbar: {
    title?: string
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
    date: Date
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
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [view, setView] = useState<ServiceView>({
    type: "month",
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  })
  const handleChangeView = useCallback((view: ServiceView) => {
    setView(view)
  }, [])
  const navigateIfDifferent = useCallback(
    (path: string) => {
      if (path !== pathname) navigate(path)
    },
    [pathname, navigate],
  )
  useEffect(() => {
    const { type, start } = view
    switch (type) {
      case "month":
        navigateIfDifferent("/service")
        break
      case "week":
        navigateIfDifferent("/service")
        break
      case "day":
      default:
        setDate(start)
        setTitle(getTitleFromDate(start))
        navigateIfDifferent(`/service/${getKeyFromDate(start)}`)
        break
    }
  }, [view, navigateIfDifferent])

  // service
  const { start, end } = view
  const service =
    useLiveQuery(() => {
      if (!start || !end) return []
      return database.service
        .where("date")
        .between(start, end, true, true)
        .toArray()
    }, [start, end]) ?? []

  // form
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(startOfDay(new Date()))
  const handleSubmit = async (service: Service) => {
    if (!service.id) service.id = uuid()
    await database.service.put(service)
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  // calendar
  const [api, setApi] = useState<CalendarApi>()
  const handleChangeApi = (api: CalendarApi) => {
    setApi(api)
  }
  const handleClickDate = (date: Date) => {
    setView({
      type: "day",
      start: startOfDay(date),
      end: endOfDay(date),
    })
  }

  // toolbar
  const { type } = view
  const [title, setTitle] = useState<string>()
  const handleChangeTitle = (title: string) => {
    setTitle(title)
  }
  const handleClickAdd = () => {
    setOpen(true)
  }
  const handleClickToday = () => {
    if (type === "day") {
      setView({
        type: "day",
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
      })
    } else {
      api?.today()
    }
  }
  const handleClickWeek = () => {
    if (type === "day") {
      setView(({ start, end }) => ({
        type: "week",
        start: startOfWeek(start),
        end: endOfWeek(end),
      }))
    } else {
      api?.changeView("dayGridWeek")
    }
  }
  const handleClickMonth = () => {
    if (type === "day") {
      setView(({ start, end }) => ({
        type: "month",
        start: startOfMonth(start),
        end: endOfMonth(end),
      }))
    } else {
      api?.changeView("dayGridMonth")
    }
  }
  const handleClickPrev = () => {
    if (type === "day") {
      setView(({ start, end }) => ({
        type: "day",
        start: addDays(start, -1),
        end: addDays(end, -1),
      }))
    } else {
      api?.prev()
    }
  }
  const handleClickNext = () => {
    if (type === "day") {
      setView(({ start, end }) => ({
        type: "day",
        start: addDays(start, 1),
        end: addDays(end, 1),
      }))
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
    service: {
      loading: !service,
      values: service ?? [],
    },
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
      date,
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
