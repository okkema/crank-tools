import type { Meta, StoryObj } from "@storybook/react"
import { ServiceForm } from "./ServiceForm"

const meta: Meta<typeof ServiceForm> = {
  title: "Service/Form",
  component: ServiceForm,
}

export default meta
type Story = StoryObj<typeof ServiceForm>

export const Primary: Story = {
  render: () => (
    <ServiceForm
      onSubmit={function () {}}
      onCancel={function () {}}
      date={new Date()}
      customers={[]}
    />
  ),
}
