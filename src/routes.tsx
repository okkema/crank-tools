import {
  CalendarToday,
  PedalBike,
  QuestionMark,
  Settings,
  Storage,
} from "@mui/icons-material"
import type { Route } from "./App"
import { lazy } from "react"
const About = lazy(() => import("./about/About"))
const CustomerDatabase = lazy(() => import("./customer/CustomerDatabase"))
const TransmissionAnalysis = lazy(
  () => import("./transmission/TransmissionAnalysis"),
)
const SettingsPanel = lazy(() => import("./settings/SettingsPanel"))
const ServiceScheduler = lazy(() => import("./service/ServiceScheduler"))
const ServiceViewer = lazy(() => import("./service/ServiceViewer"))
const ServiceCalendar = lazy(() => import("./service/ServiceCalendar"))

const routes: Route[] = [
  {
    title: "Service Scheduler",
    path: "/service",
    element: <ServiceScheduler />,
    icon: <CalendarToday />,
    children: [
      {
        path: "/",
        element: <ServiceCalendar />,
      },
      {
        path: "/:date",
        element: <ServiceViewer />,
      },
    ],
  },
  {
    title: "Transmission Analysis",
    path: "/transmission",
    element: <TransmissionAnalysis />,
    icon: <PedalBike />,
  },
  {
    title: "Customer Database",
    path: "/customer",
    element: <CustomerDatabase />,
    icon: <Storage />,
  },
  {
    title: "Settings Panel",
    path: "/settings",
    element: <SettingsPanel />,
    icon: <Settings />,
  },
  {
    title: "About",
    path: "/",
    element: <About />,
    icon: <QuestionMark />,
  },
]

export default routes
