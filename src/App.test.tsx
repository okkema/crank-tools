import App from "./App"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const renderApp = () => render(<App />)

describe("App", () => {
  it("displays the title", () => {
    renderApp()
    expect(screen.getByText(/crank tools/i)).toBeInTheDocument()
  })
  it("displays the content", () => {
    renderApp()
    expect(screen.getByText(/content/i)).toBeInTheDocument()
  })
  it("toggles the navigation drawer", async () => {
    renderApp()
    expect(screen.queryByText(/navigation/i)).not.toBeInTheDocument()
    userEvent.click(screen.getByRole("button", { name: /menu/i }))
    expect(screen.getByText(/navigation/i)).toBeInTheDocument()
    userEvent.keyboard("{esc}")
    await waitFor(() => {
      expect(screen.queryByText(/navigation/i)).not.toBeInTheDocument()
    })
  })
})
