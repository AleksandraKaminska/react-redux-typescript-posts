import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Hint } from "./hint"

describe("Hint Component", () => {
  it("should render with default info variant", () => {
    render(<Hint>Default Info Hint</Hint>)
    const hintElement = screen.getByText("Default Info Hint")
    const svgElement = hintElement.querySelector("svg")

    expect(hintElement).toBeInTheDocument()
    expect(hintElement).toHaveClass("text-ui-fg-subtle") // Class name from info variant
    expect(svgElement).not.toBeInTheDocument() // No CircleAlert icon should be present
  })

  it("should render with error variant", () => {
    render(<Hint variant="error">Error Hint</Hint>)
    const hintElement = screen.getByText("Error Hint")
    const svgElement = hintElement.querySelector("svg")

    expect(hintElement).toBeInTheDocument()
    expect(hintElement).toHaveClass("text-ui-fg-error") // Class name from error variant
    expect(svgElement).toBeInTheDocument() // No CircleAlert icon should be present
  })

  it("should apply additional class names", () => {
    render(<Hint className="additional-class">Hint with additional class</Hint>)
    const hintElement = screen.getByText("Hint with additional class")

    expect(hintElement).toBeInTheDocument()
    expect(hintElement).toHaveClass("additional-class")
  })
})
