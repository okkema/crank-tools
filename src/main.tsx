import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import routes from "./routes"
import CssBaseline from "@mui/material/CssBaseline"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import {
  BrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material"
import AlertProvider from "./shared/AlertProvider"
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
    new Sentry.Replay(),
  ],
  tracePropagationTargets: ["*"],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
  replaysOnErrorSampleRate: 1.0,
})

const theme = createTheme()
const root = createRoot(document.getElementById("root")!)
root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary>
      <CssBaseline />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AlertProvider>
            <App routes={routes} />
          </AlertProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
)
