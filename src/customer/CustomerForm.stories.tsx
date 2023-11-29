import type { Meta, StoryObj } from "@storybook/react"
import { CustomerForm, DefaultCustomer } from "./CustomerForm"

const meta: Meta<typeof CustomerForm> = {
  title: "CustomerForm",
  component: CustomerForm,
}

export default meta
type Story = StoryObj<typeof CustomerForm>

export const Primary: Story = {
  render: () => (
    <CustomerForm
      customer={DefaultCustomer}
      onCancel={function () {}}
      onSubmit={function () {}}
    />
  ),
}
