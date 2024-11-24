import {
  CircleCheck,
  CircleAlert,
  Info,
  LoaderCircle,
  CircleX,
} from "lucide-react"

import { ToastAction, ToastVariant } from "../types"
import { clx } from "@/utils/clx"

interface ToastComponentProps {
  id: string | number
  variant?: ToastVariant
  title: string
  description?: string
  action?: ToastAction
  onDismiss?: (id?: string | number) => void
  dismissLabel?: string
}

/**
 * This component is based on the [Sonner](https://sonner.emilkowal.ski/toast) toast library.
 */
export const Toast = ({
  /**
   * Optional ID of the toast.
   */
  id,
  /**
   * @ignore
   *
   * @privateRemarks
   * As the Toast component is created using
   * the `toast` utility functions, the variant is inferred
   * from the utility function.
   */
  variant = "info",
  /**
   * @ignore
   *
   * @privateRemarks
   * The `toast` utility functions accept this as a parameter.
   */
  title,
  /**
   * The toast's text.
   */
  description,
  /**
   * The toast's action buttons.
   */
  action,
  /**
   * @ignore
   *
   * @privateRemarks
   * The `toast` utility functions don't allow
   * passing this prop.
   */
  onDismiss,
  /**
   * The label of the dismiss button, if available.
   */
  dismissLabel = "Close",
}: ToastComponentProps) => {
  const hasActionables = !!action || onDismiss
  let icon = undefined

  switch (variant) {
    case "success":
      icon = <CircleCheck role="img" className="text-ui-tag-green-icon" />
      break
    case "warning":
      icon = <CircleAlert role="img" className="text-ui-tag-orange-icon" />
      break
    case "error":
      icon = <CircleX role="img" className="text-ui-tag-red-icon" />
      break
    case "loading":
      icon = (
        <LoaderCircle
          role="img"
          className="animate-spin text-ui-tag-blue-icon"
        />
      )
      break
    case "info":
      icon = <Info role="img" className="text-ui-fg-base" />
      break
    default:
      break
  }

  return (
    <div className="flex w-fit min-w-[360px] max-w-[440px] overflow-hidden rounded-lg bg-ui-bg-base shadow-elevation-flyout">
      <div
        className={clx("grid flex-1 items-start gap-3 py-3 pl-3", {
          "border-r pr-3": hasActionables,
          "pr-6": !hasActionables,
          "grid-cols-[20px_1fr]": !!icon,
          "grid-cols-1": !icon,
        })}
      >
        {!!icon && (
          <span className="flex size-5 items-center justify-center" aria-hidden>
            {icon}
          </span>
        )}
        <div className="flex flex-col">
          <span className="txt-compact-small-plus text-ui-fg-base">
            {title}
          </span>
          <span className="txt-small text-pretty text-ui-fg-subtle">
            {description}
          </span>
        </div>
      </div>
      {hasActionables && (
        <div
          className={clx("grid grid-cols-1", {
            "grid-rows-2": !!action && onDismiss,
            "grid-rows-1": !action || !onDismiss,
          })}
        >
          {!!action && (
            <button
              type="button"
              className={clx(
                "txt-compact-small-plus flex items-center justify-center bg-ui-bg-base px-4 text-ui-fg-base transition-colors hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed",
                {
                  "border-b border-ui-border-base": onDismiss,
                  "text-ui-fg-error": action.variant === "destructive",
                }
              )}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          )}
          {onDismiss && (
            <button
              type="button"
              onClick={() => onDismiss(id)}
              className={clx(
                "txt-compact-small-plus flex items-center justify-center bg-ui-bg-base px-4 text-ui-fg-subtle transition-colors hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed"
              )}
            >
              {dismissLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
