import { PedalBike, QuestionMark } from "@mui/icons-material"
import type { Route } from "./App"
import About from "./about/About"
import TransmissionAnalysis from "./transmission/TransmissionAnalysis"

const routes: Route[] = [
  {
    title: "Transmission Analysis",
    path: "/transmission",
    element: <TransmissionAnalysis />,
    icon: <PedalBike />,
  },
  {
    title: "About",
    path: "/",
    element: <About />,
    icon: <QuestionMark />,
  },
]

export default routes
