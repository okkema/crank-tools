import { List } from "@mui/material"
import DemoMode from "./DemoMode"

const SettingsPanel = (): JSX.Element => {
  return (
    <List sx={{ padding: 0 }}>
      <DemoMode />
    </List>
  )
}

export default SettingsPanel
