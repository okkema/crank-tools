type ServiceStatus = "pending" | "active" | "issue" | "completed" | "delivered"

type ServiceDetail = {
  id: string
  description: string
  amount: number
}

type Service = {
  id: string
  details: ServiceDetail[]
  status: ServiceStatus
  bike?: string | Bike
  customer?: string | Customer
}
