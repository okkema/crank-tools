import ServiceToolbar from "./ServiceToolbar"
import database from "../database"
import ServiceForm from "./ServiceForm"
import { Outlet } from "react-router-dom"
import ServiceProvider from "./ServiceProvider"

const ServiceScheduler = () => {
  // customers
  const customers = database.customers.orderBy("name").toArray()

  return (
    <ServiceProvider>
      <>
        <ServiceToolbar />
        <Outlet />
        <ServiceForm customers={customers ?? []} />
      </>
    </ServiceProvider>
  )
}

export default ServiceScheduler
