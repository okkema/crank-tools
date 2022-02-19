import { PedalBike, QuestionMark, Storage } from "@mui/icons-material"
import type { Route } from "./App"
import { lazy } from "react"
const About = lazy(() => import("./about/About"))
const CustomerDatabase = lazy(() => import("./customer/CustomerDatabase"))
const TransmissionAnalysis = lazy(
  () => import("./transmission/TransmissionAnalysis"),
)

const routes: Route[] = [
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
