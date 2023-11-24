import App, { Route } from "./App"
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"

const route: Route = {
  title: "index",
  path: "/",
  icon: <div>icon</div>,
  element: <div>content</div>,
}

const renderApp = function (routes: Route[] = [route]) {
  return {
    user: userEvent.setup(),
    ...render(
      <BrowserRouter>
        <App routes={routes} />
      </BrowserRouter>,
    ),
  }
}

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
    const { user } = renderApp()
    expect(screen.queryByText(/crank tools/i)).not.toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /menu/i }))
    await screen.findByText(/crank tools/i)
    await user.keyboard("{Escape}")
    await waitForElementToBeRemoved(() => screen.queryByText(/crank tools/i))
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
    const { user } = renderApp(routes)
    expect(screen.queryByText(/different/i)).not.toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /menu/i }))
    const link = await screen.findByRole("link", { name: /another/i })
    await user.click(link)
    await screen.findByText(/different/i)
  })
})
