import {
  CalendarToday,
  PedalBike,
  QuestionMark,
  Storage,
} from "@mui/icons-material"
import type { Route } from "./App"
import About from "./about/About"
import TransmissionAnalysis from "./transmission/TransmissionAnalysis"
import CustomerDatabase from "./customer/CustomerDatabase"
import ServiceScheduler from "./service/ServiceScheduler"
import ServiceViewer from "./service/ServiceViewer"

const routes: Route[] = [
  {
    title: "Service Scheduler",
    path: "/service",
    element: <ServiceScheduler />,
    icon: <CalendarToday />,
    children: [
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
    title: "About",
    path: "/",
    element: <About />,
    icon: <QuestionMark />,
  },
]

export default routes
