import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { InfoBox } from "./info-box"

// Mock useTranslation hook

describe("InfoBox Component", () => {
  it("renders without crashing", () => {
    render(<InfoBox label="Test Label" />)
    expect(screen.getByText("Test Label")).toBeInTheDocument()
  })

  it("renders description and truncation", () => {
    render(
      <InfoBox
        label="Test Label"
        description="This is a long description that should be truncated."
      />
    )

    const description = screen.getByText(
      "This is a long description that should be truncated."
    )
    expect(description).toBeInTheDocument()
    // Ensure truncation is applied
    expect(description).toHaveClass("line-clamp-3")

    const showMoreButton = screen.getByRole("button", {
      name: "general.showMore",
    })
    fireEvent.click(showMoreButton)

    // Verify description is fully shown after click
    expect(description).not.toHaveClass("line-clamp-3")
    expect(
      screen.getByRole("button", { name: "general.showLess" })
    ).toBeInTheDocument()
  })

  it("handles image prop", () => {
    render(<InfoBox label="Test Label" image="http://example.com/image.jpg" />)

    expect(screen.getByAltText("Bold typography")).toHaveAttribute(
      "src",
      "http://example.com/image.jpg"
    )
  })

  it("handles children", () => {
    render(
      <InfoBox label="Test Label">
        <div data-testid="child-element">Child Element</div>
      </InfoBox>
    )

    expect(screen.getByTestId("child-element")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<InfoBox label="Test Label" className="custom-class" />)

    expect(screen.getByText("Test Label").closest("div")).toHaveClass(
      "custom-class"
    )
  })
})
