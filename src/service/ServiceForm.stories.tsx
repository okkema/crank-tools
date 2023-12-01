import type { Meta, StoryObj } from "@storybook/react"
import { ServiceForm } from "./ServiceForm"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"

const meta: Meta<typeof ServiceForm> = {
  title: "Service/Form",
  component: ServiceForm,
}

export default meta
type Story = StoryObj<typeof ServiceForm>

export const Primary: Story = {
  render: () => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ServiceForm
        onSubmit={function () {}}
        onCancel={function () {}}
        date={new Date()}
        customers={[]}
      />
    </LocalizationProvider>
  ),
}
