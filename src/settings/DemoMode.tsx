import { ListItem, ListItemText, Switch } from "@mui/material"
import { useState } from "react"
import useStorage from "../shared/useStorage"

const KEY = "demo"

const DemoMode = (): JSX.Element => {
  const storage = useStorage()
  const [checked, setChecked] = useState(!!storage.get<boolean>(KEY))
  const primary = "Demo Mode"
  const secondary = checked
    ? "WARNING - Disabling Demo Mode reset all data."
    : "WARNING - Enabling Demo Mode will wipe data and populate Crank Tools with test data."

  const handleChange = (_: any, checked: boolean) => {
    if (storage.set(KEY, checked)) {
      setChecked(checked)
      import("../demo/toggleDemoMode").then(async (demo) => {
        await demo.default(checked)
      })
    }
  }

  return (
    <ListItem>
      <ListItemText primary={primary} secondary={secondary} />
      <Switch checked={checked} onChange={handleChange} />
    </ListItem>
  )
}

export default DemoMode
