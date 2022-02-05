import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import routes from "./routes"
import CssBaseline from "@mui/material/CssBaseline"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <App routes={routes} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)
