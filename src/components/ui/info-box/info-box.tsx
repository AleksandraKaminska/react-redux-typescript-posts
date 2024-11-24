import * as React from "react"

import { clx } from "@/utils/clx"
import { Hint } from "../hint"
import { Text } from "../text"

interface InfoBoxProps {
  /** The main label or title for the InfoBox */
  label: string | React.ReactNode
  /** Optional description text to provide more information */
  description?: string
  /** Additional custom class names to apply to the InfoBox */
  className?: string
  /** Any additional React nodes (elements) to be displayed within the InfoBox */
  children?: React.ReactNode
}

const InfoBox = React.forwardRef<HTMLDivElement, InfoBoxProps>(
  ({ className, label, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clx(
          "group flex items-start gap-x-2 rounded-lg bg-ui-bg-base p-3 shadow-borders-base transition-fg focus-visible:shadow-borders-interactive-with-focus disabled:cursor-not-allowed disabled:bg-ui-bg-disabled",
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-start">
          <Text
            size="small"
            weight="plus"
            className="cursor-pointer group-disabled:cursor-not-allowed group-disabled:text-ui-fg-disabled"
          >
            {label}
          </Text>
          <Hint className="txt-compact-medium break-words text-left text-ui-fg-subtle group-disabled:text-ui-fg-disabled">
            {description}
          </Hint>
          {children}
        </div>
      </div>
    )
  }
)

export { InfoBox }
