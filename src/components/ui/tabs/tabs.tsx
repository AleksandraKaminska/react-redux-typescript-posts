import * as TabsPrimitives from "@radix-ui/react-tabs"
import * as React from "react"

import { clx } from "@/utils/clx"

/**
 * This component is based on the [Radix UI Tabs](https://radix-ui.com/primitives/docs/components/tabs) primitives
 */
const TabsRoot = (
  props: React.ComponentPropsWithoutRef<typeof TabsPrimitives.Root>
) => {
  return <TabsPrimitives.Root {...props} />
}
TabsRoot.displayName = "Tabs"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitives.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitives.Trigger
    ref={ref}
    className={clx(
      "txt-compact-small-plus inline-flex items-center justify-center rounded-full border border-transparent bg-transparent px-2.5 py-1 text-ui-fg-subtle outline-none transition-fg",
      "hover:text-ui-fg-base",
      "focus-visible:border-ui-border-interactive focus-visible:bg-ui-bg-base focus-visible:!shadow-borders-focus",
      "data-[state=active]:bg-ui-bg-base data-[state=active]:text-ui-fg-base data-[state=active]:shadow-elevation-card-rest",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitives.Trigger>
))
TabsTrigger.displayName = "Tabs.Trigger"

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitives.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitives.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitives.List
    ref={ref}
    className={clx("flex items-center gap-2", className)}
    {...props}
  />
))
TabsList.displayName = "Tabs.List"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitives.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitives.Content
    ref={ref}
    className={clx("outline-none", className)}
    {...props}
  />
))
TabsContent.displayName = "Tabs.Content"

const Tabs = Object.assign(TabsRoot, {
  Trigger: TabsTrigger,
  List: TabsList,
  Content: TabsContent,
})

export { Tabs }
