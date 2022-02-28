import ServiceToolbar from "./ServiceToolbar"
import ServiceForm from "./ServiceForm"
import { Outlet } from "react-router-dom"
import ServiceProvider from "./ServiceProvider"
import { Suspense } from "react"
import { LocalizationProvider } from "@mui/lab"
import dateAdapter from "@mui/lab/AdapterDateFns"
import Loading from "../shared/Loading"

const ServiceScheduler = () => {
  return (
    <LocalizationProvider dateAdapter={dateAdapter}>
      <ServiceProvider>
        <>
          <ServiceToolbar />
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
          <ServiceForm />
        </>
      </ServiceProvider>
    </LocalizationProvider>
  )
}

export default ServiceScheduler
