import ServiceToolbar from "./ServiceToolbar"
import database from "../database"
import ServiceCalendar from "./ServiceCalendar"
import ServiceForm from "./ServiceForm"
import ServiceProvider from "./ServiceProvider"

const ServiceScheduler = () => {
  // customers
  const customers = database.customers.orderBy("name").toArray()

  return (
    <ServiceProvider>
      <>
        <ServiceToolbar />
        <ServiceCalendar />
        <ServiceForm customers={customers ?? []} />
      </>
    </ServiceProvider>
  )
}

export default ServiceScheduler
