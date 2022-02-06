import { QuestionMark } from "@mui/icons-material"
import type { Route } from "./App"
import About from "./about/About"

const routes: Route[] = [
  {
    title: "About",
    path: "/",
    element: <About />,
    icon: <QuestionMark />,
  },
]

export default routes
