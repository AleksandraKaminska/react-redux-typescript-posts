import { render, screen } from "@testing-library/react"
import { Tabs } from "./tabs"

describe("Tabs", () => {
  it("should render the tabs and their content", () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>
    )

    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument()
    expect(screen.getByText("Content 1")).toBeInTheDocument()
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument()
  })
})
