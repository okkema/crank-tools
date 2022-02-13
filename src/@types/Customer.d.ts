type Customer = {
  id: string
  name: string
  email: string
  phone: string
  bikes?: string[] | Bike[]
  service?: string[] | Service[]
}
