import type { Meta, StoryObj } from "@storybook/react"
import { ServiceStatusChip } from "./ServiceStatusChip"

const meta: Meta<typeof ServiceStatusChip> = {
  title: "Service/StatusChip",
  component: ServiceStatusChip,
}

export default meta
type Story = StoryObj<typeof ServiceStatusChip>

export const All: Story = {
  render: () => (
    <>
      <ServiceStatusChip status="pending" />
      <ServiceStatusChip status="active" />
      <ServiceStatusChip status="issue" />
      <ServiceStatusChip status="completed" />
      <ServiceStatusChip status="delivered" />
    </>
  ),
}
