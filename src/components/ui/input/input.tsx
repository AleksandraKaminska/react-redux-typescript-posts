import { Eye, EyeOff, Search } from "lucide-react"
import { VariantProps, cva } from "cva"
import * as React from "react"

import { clx } from "@/utils/clx"

const inputBaseStyles = clx(
  "caret-ui-fg-base bg-ui-bg-field hover:bg-ui-bg-field-hover shadow-borders-base placeholder-ui-fg-muted text-ui-fg-base transition-fg relative w-full appearance-none rounded-md outline-none",
  "focus-visible:shadow-borders-interactive-with-active",
  "disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:placeholder-ui-fg-disabled disabled:cursor-not-allowed",
  "aria-[invalid=true]:!shadow-borders-error  invalid:!shadow-borders-error"
)

const inputVariants = cva({
  base: clx(
    inputBaseStyles,
    "[&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
  ),
  variants: {
    size: {
      base: "txt-compact-small h-8 px-2 py-1.5",
      small: "txt-compact-small h-7 px-2 py-1",
    },
  },
  defaultVariants: {
    size: "base",
  },
})

interface InputProps
  extends VariantProps<typeof inputVariants>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {}

/**
 * This component is based on the `input` element and supports all of its props
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      /**
       * The input's size.
       */
      size = "base",
      ...props
    }: InputProps,
    ref
  ) => {
    const [typeState, setTypeState] = React.useState(type)

    const isPassword = type === "password"
    const isSearch = type === "search"

    return (
      <div className="relative">
        <input
          ref={ref}
          type={isPassword ? typeState : type}
          className={clx(
            inputVariants({ size: size }),
            {
              "pl-8": isSearch && size === "base",
              "pr-8": isPassword && size === "base",
              "pl-7": isSearch && size === "small",
              "pr-7": isPassword && size === "small",
            },
            className
          )}
          {...props}
        />
        {isSearch && (
          <div
            className={clx(
              "pointer-events-none absolute bottom-0 left-0 flex items-center justify-center text-ui-fg-muted",
              {
                "h-8 w-8": size === "base",
                "h-7 w-7": size === "small",
              }
            )}
            role="img"
          >
            <Search size={16} />
          </div>
        )}
        {isPassword && (
          <div
            className={clx(
              "absolute bottom-0 right-0 flex items-center justify-center border-l",
              {
                "h-8 w-8": size === "base",
                "h-7 w-7": size === "small",
              }
            )}
          >
            <button
              className="focus-visible:shadow-borders-interactive-w-focus h-fit w-fit rounded-sm text-ui-fg-muted outline-none transition-all hover:text-ui-fg-base focus-visible:text-ui-fg-base active:text-ui-fg-base"
              type="button"
              onClick={() => {
                setTypeState(typeState === "password" ? "text" : "password")
              }}
            >
              <span className="sr-only">
                {typeState === "password" ? "Show password" : "Hide password"}
              </span>
              {typeState === "password" ? (
                <Eye size={20} />
              ) : (
                <EyeOff size={20} />
              )}
            </button>
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputBaseStyles }