import { render } from "@testing-library/react"
import { Toaster } from "./toaster"
import { Toaster as Primitive } from "sonner"
import { vi } from "vitest"

vi.mock("sonner", () => ({
  Toaster: vi.fn(() => null),
}))

describe("Toaster", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("renders with default props", () => {
    render(<Toaster />)

    expect(Primitive).toHaveBeenCalledWith(
      expect.objectContaining({
        position: "bottom-right",
        gap: 12,
        offset: 24,
        cn: expect.any(Function), // Since clx is a function
        toastOptions: { duration: undefined },
      }),
      {}
    )
  })

  test("renders with custom props", () => {
    const customProps = {
      position: "top-left" as any,
      gap: 20,
      offset: 30,
      duration: 5000,
    }

    render(<Toaster {...customProps} />)

    expect(Primitive).toHaveBeenCalledWith(
      expect.objectContaining({
        position: "top-left",
        gap: 20,
        offset: 30,
        cn: expect.any(Function),
        toastOptions: { duration: 5000 },
      }),
      {}
    )
  })

  test("forwards additional props to Primitive component", () => {
    const additionalProps = {
      "aria-live": "polite",
    }

    render(<Toaster {...additionalProps} />)

    expect(Primitive).toHaveBeenCalledWith(
      expect.objectContaining({
        "aria-live": "polite",
      }),
      {}
    )
  })
})
