import { useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Drawer,
} from "@mui/material"
import { Menu } from "@mui/icons-material"

const App = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ marginRight: 2 }}
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" flexGrow="1">
            Crank Tools
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        Navigation
      </Drawer>
      <Container>Content</Container>
    </>
  )
}

export default App
