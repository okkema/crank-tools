import { PedalBike, QuestionMark, Storage } from "@mui/icons-material"
import type { Route } from "./App"
import About from "./about/About"
import TransmissionAnalysis from "./transmission/TransmissionAnalysis"
import CustomerDatabase from "./customer/CustomerDatabase"

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
