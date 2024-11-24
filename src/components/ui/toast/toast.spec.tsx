import { render, screen, fireEvent } from "@testing-library/react"
import { vi } from "vitest"
import { Toast } from "./toast"

describe("Toast", () => {
  it("renders with default props", () => {
    render(<Toast id="test-toast" title="Test Title" />)
    expect(screen.getByText("Test Title")).toBeInTheDocument()
  })

  it("renders with a description", () => {
    render(
      <Toast
        id="test-toast"
        title="Test Title"
        description="Test Description"
      />
    )
    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
  })

  it("renders with a success variant", () => {
    render(<Toast id="test-toast" title="Test Title" variant="success" />)
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "text-ui-tag-green-icon"
    )
  })

  it("renders with a warning variant", () => {
    render(<Toast id="test-toast" title="Test Title" variant="warning" />)
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "text-ui-tag-orange-icon"
    )
  })

  it("renders with an error variant", () => {
    render(<Toast id="test-toast" title="Test Title" variant="error" />)
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "text-ui-tag-red-icon"
    )
  })

  it("renders with a loading variant", () => {
    render(<Toast id="test-toast" title="Test Title" variant="loading" />)
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "animate-spin text-ui-tag-blue-icon"
    )
  })

  it("renders with an info variant", () => {
    render(<Toast id="test-toast" title="Test Title" variant="info" />)
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "text-ui-fg-base"
    )
  })

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn()
    render(<Toast id="test-toast" title="Test Title" onDismiss={onDismiss} />)
    fireEvent.click(screen.getByText("Close"))
    expect(onDismiss).toHaveBeenCalledWith("test-toast")
  })

  it("renders action button and calls action onClick", () => {
    const onClick = vi.fn()
    render(
      <Toast
        id="test-toast"
        title="Test Title"
        action={{ label: "Action", onClick, altText: "alt" }}
      />
    )
    fireEvent.click(screen.getByText("Action"))
    expect(onClick).toHaveBeenCalled()
  })

  it("renders both action and dismiss buttons", () => {
    const onClick = vi.fn()
    const onDismiss = vi.fn()
    render(
      <Toast
        id="test-toast"
        title="Test Title"
        action={{ label: "Action", onClick, altText: "alt" }}
        onDismiss={onDismiss}
      />
    )
    expect(screen.getByText("Action")).toBeInTheDocument()
    expect(screen.getByText("Close")).toBeInTheDocument()
  })
})
