import { v4 as uuid } from "uuid"
import { faker } from "@faker-js/faker"

const createCustomers = (count: number): Customer[] => {
  return Array.from({ length: count }, () => ({
    id: uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  }))
}
export default createCustomers
