import { clx } from "@/components/ui"
import { ComponentPropsWithoutRef } from "react"
import { Link } from "react-router-dom"

export const InlineLink = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) => {
  return (
    <Link
      onClick={(e) => {
        e.stopPropagation()
      }}
      className={clx(
        "rounded-md text-ui-fg-interactive outline-none transition-fg hover:text-ui-fg-interactive-hover focus-visible:text-ui-fg-interactive-hover",
        className
      )}
      {...props}
    />
  )
}
