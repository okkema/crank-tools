import App from "./App"
import { render, screen } from "@testing-library/react"

describe("App", () => {
  it("displays the title", () => {
    render(<App />)
    expect(screen.getByText(/Crank Tools/i)).toBeInTheDocument()
  })
})
