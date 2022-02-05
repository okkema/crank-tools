import { PedalBike, QuestionMark } from "@mui/icons-material"
import { Container } from "@mui/material"
import type { Route } from "./App"

const routes: Route[] = [
  {
    title: "Transmission",
    path: "/",
    element: <Container>Transmission</Container>,
    icon: <PedalBike />,
  },
  {
    title: "About",
    path: "/about",
    element: <Container>About</Container>,
    icon: <QuestionMark />,
  },
]

export default routes
