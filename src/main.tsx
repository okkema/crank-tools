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
import { ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme()

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App routes={routes} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)
