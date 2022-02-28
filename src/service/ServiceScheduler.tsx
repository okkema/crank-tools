import ServiceToolbar from "./ServiceToolbar"
import ServiceForm from "./ServiceForm"
import { Outlet } from "react-router-dom"
import ServiceProvider from "./ServiceProvider"
import { Suspense } from "react"
import { Box, CircularProgress } from "@mui/material"
import { LocalizationProvider } from "@mui/lab"
import dateAdapter from "@mui/lab/AdapterDateFns"

const ServiceScheduler = () => {
  return (
    <LocalizationProvider dateAdapter={dateAdapter}>
      <ServiceProvider>
        <>
          <ServiceToolbar />
          <Suspense
            fallback={
              <Box
                display="flex"
                height="100%"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
          <ServiceForm />
        </>
      </ServiceProvider>
    </LocalizationProvider>
  )
}

export default ServiceScheduler
