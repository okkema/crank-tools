import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Container,
} from "@mui/material"
import { Menu } from "@mui/icons-material"
import { useLocation, Link, Route, Routes } from "react-router-dom"
import { Suspense, useState } from "react"

export type Route = {
  title: string
  path: string
  element: JSX.Element
  icon?: JSX.Element
  children?: {
    path: string
    element: JSX.Element
  }[]
}

export type AppProps = {
  routes: Route[]
  title?: string
}

const App = ({ routes, title = "Crank Tools" }: AppProps): JSX.Element => {
  // menu
  const [open, setOpen] = useState(false)

  // current route
  const { pathname } = useLocation()
  const route = routes.find(({ path }) => pathname.startsWith(path))

  return (
    <Box height={"100%"}>
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
            {route?.title ?? title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box onClick={() => setOpen(false)} height="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={1}
          >
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Box>
          <List>
            {routes.map(({ title, path, icon }) => (
              <ListItem key={path} disablePadding>
                <ListItemButton component={Link} to={path}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText>{title}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box height={"calc(100% - 48px)"} overflow="auto">
        <Suspense fallback={<LinearProgress />}>
          <Container
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
              height: "calc(100% - 48px)",
            }}
          >
            <Routes>
              {routes.map(({ path, element, children }) => {
                if (children)
                  return (
                    <Route key={path} path={path} element={element}>
                      {children.map((child) => (
                        <Route
                          key={child.path}
                          path={`${path}${child.path}`}
                          element={child.element}
                        />
                      ))}
                    </Route>
                  )
                return <Route key={path} path={path} element={element} />
              })}
            </Routes>
          </Container>
        </Suspense>
      </Box>
    </Box>
  )
}

export default App
