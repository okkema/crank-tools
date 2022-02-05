import App, { Route } from "./App"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"

const route: Route = {
  title: "index",
  path: "/",
  icon: <div>icon</div>,
  element: <div>content</div>,
}

const renderApp = (routes: Route[] = [route]) =>
  render(
    <BrowserRouter>
      <App routes={routes} />
    </BrowserRouter>,
  )

describe("App", () => {
  it("renders the route title", () => {
    renderApp()
    expect(screen.getByText(/index/i)).toBeInTheDocument()
  })
  it("renders the route content", () => {
    renderApp()
    expect(screen.getByText(/content/i)).toBeInTheDocument()
  })
  it("toggles the menu", async () => {
    renderApp()
    expect(screen.queryByText(/crank tools/i)).not.toBeInTheDocument()
    userEvent.click(screen.getByRole("button", { name: /menu/i }))
    expect(screen.getByText(/crank tools/i)).toBeInTheDocument()
    userEvent.keyboard("{esc}")
    await waitFor(() => {
      expect(screen.queryByText(/crank tools/i)).not.toBeInTheDocument()
    })
  })
  it("navigates between routes", async () => {
    const routes: Route[] = [
      route,
      {
        title: "another page",
        path: "/other",
        element: <div>different content</div>,
      },
    ]
    renderApp(routes)
    expect(screen.queryByText(/different/i)).not.toBeInTheDocument()
    userEvent.click(screen.getByRole("button", { name: /menu/i }))
    userEvent.click(screen.getByRole("link", { name: /another/i }))
    expect(screen.getByText(/different/i)).toBeInTheDocument()
  })
})
