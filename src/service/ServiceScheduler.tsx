import ServiceToolbar from "./ServiceToolbar"
import database from "../database"
import ServiceForm from "./ServiceForm"
import { Outlet } from "react-router-dom"
import ServiceProvider from "./ServiceProvider"
import { Suspense } from "react"
import { Box, CircularProgress } from "@mui/material"

const ServiceScheduler = () => {
  // customers
  const customers = database.customers.orderBy("name").toArray()

  return (
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
        <ServiceForm customers={customers ?? []} />
      </>
    </ServiceProvider>
  )
}

export default ServiceScheduler
