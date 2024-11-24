import type { Meta, StoryObj } from "@storybook/react"
import { InfoBox } from "./info-box"
import { IconButton } from "../icon-button"
import { Plus } from "lucide-react"

const meta: Meta<typeof InfoBox> = {
  title: "Components/InfoBox",
  component: InfoBox,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof InfoBox>

export const Default: Story = {
  render: () => (
    <InfoBox
      label="One"
      description="The quick brown fox jumps over a lazy dog."
    />
  ),
}

export const WithImage: Story = {
  render: () => (
    <InfoBox
      label="Two"
      className="w-72"
      description="The quick brown fox jumps over a lazy dog."
      image="https://images.unsplash.com/photo-1721419336937-86dc7d479f2c?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  ),
}

export const LongDescription: Story = {
  render: () => (
    <InfoBox
      label="Four"
      className="w-64"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    />
  ),
}

export const WithChildren: Story = {
  render: () => (
    <InfoBox
      label="Five"
      description="The quick brown fox jumps over a lazy dog."
    >
      <IconButton>
        <Plus />
      </IconButton>
    </InfoBox>
  ),
}
