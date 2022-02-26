type ServiceStatus = "pending" | "active" | "issue" | "completed" | "delivered"

type ServiceDetail = {
  id: string
  description: string
  amount: string
}

type Service = {
  id: string
  details: ServiceDetail[]
  status: ServiceStatus
  date: Date
  customer?: string | Customer
}
