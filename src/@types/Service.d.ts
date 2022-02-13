type Service = {
  id: string
  items: {
    text: string
    amount: number
  }[]
  bike?: string | Bike
  customer?: string | Customer
}
