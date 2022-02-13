type Bike = {
  id: string
  color: string
  brand: string
  model: string
  customer?: string | Customer
  service?: string[] | Service[]
}
