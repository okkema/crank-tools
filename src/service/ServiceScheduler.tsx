import ServiceToolbar from "./ServiceToolbar"
import { ServiceForm } from "./ServiceForm"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ServiceProvider } from "./ServiceProvider"
import { Suspense, useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import Loading from "../shared/Loading"
import { Box, Drawer } from "@mui/material"
import { startOfDay } from "date-fns"
import { v4 as uuid } from "uuid"
import { database } from "../database"

const ServiceScheduler = () => {
  // provider
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // form
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(startOfDay(new Date()))
  const handleSubmit = async (service: Service) => {
    if (!service.id) service.id = uuid()
    await database.service.put(service)
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const customers = database.customers.orderBy("name").toArray()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ServiceProvider
        pathname={pathname}
        navigate={navigate}
        setDate={setDate}
        setOpen={setOpen}
      >
        <ServiceToolbar />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
        <Drawer
          open={open}
          onClose={handleClose}
          anchor="right"
          PaperProps={{ sx: { width: "1000px", maxWidth: "100vw" } }}
        >
          <Box height={"100%"} padding={2}>
            <ServiceForm
              onSubmit={handleSubmit}
              onCancel={handleClose}
              date={date}
              customers={customers}
            />
          </Box>
        </Drawer>
      </ServiceProvider>
    </LocalizationProvider>
  )
}

export default ServiceScheduler
