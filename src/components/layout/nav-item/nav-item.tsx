import { Text, clx } from "@/components/ui"
import * as Collapsible from "@radix-ui/react-collapsible"
import { useEffect, useState } from "react"
import { Link, LinkProps, useLocation } from "react-router-dom"

interface NestedItemProps extends LinkProps {
  label: string
  to: string
}

export interface NavItemProps {
  icon?: (size?: number) => React.ReactNode
  label: string
  to: string
  items?: NestedItemProps[]
  from?: string
}

export const NavItem = ({ icon, label, to, items, from }: NavItemProps) => {
  const location = useLocation()

  const [open, setOpen] = useState(
    [to, ...(items?.map((i) => i.to) ?? [])].some((p) =>
      location.pathname.startsWith(p)
    )
  )

  useEffect(() => {
    setOpen(
      [to, ...(items?.map((i) => i.to) ?? [])].some((p) =>
        location.pathname.startsWith(p)
      )
    )
  }, [location.pathname, to, items])

  return (
    <div className="px-3">
      <Link
        to={to}
        state={
          from
            ? {
                from,
              }
            : undefined
        }
        className={clx(
          "flex items-center gap-x-2 rounded-md px-2 py-2.5 text-ui-fg-subtle outline-none transition-fg hover:bg-ui-bg-subtle-hover hover:text-ui-fg-base md:py-1.5",
          {
            "bg-ui-bg-base shadow-elevation-card-rest hover:bg-ui-bg-base-hover":
              location.pathname === to ||
              location.pathname.startsWith(to + "/"),
            "max-md:hidden": items && items.length > 0,
          }
        )}
      >
        {icon?.()}
        <Text size="small" weight="plus" leading="compact">
          {label}
        </Text>
      </Link>
      {items && items.length > 0 && (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger
            className={clx(
              "flex w-full items-center gap-x-2 rounded-md px-2 py-2.5 text-ui-fg-subtle outline-none transition-fg hover:bg-ui-bg-subtle-hover hover:text-ui-fg-base md:hidden md:py-1.5"
            )}
          >
            {icon?.()}
            <Text size="small" weight="plus" leading="compact">
              {label}
            </Text>
          </Collapsible.Trigger>
          <Collapsible.Content className="flex flex-col pt-1">
            <div className="flex h-[36px] w-full items-center gap-x-1 pl-2 md:hidden">
              <div
                role="presentation"
                className="flex h-full w-5 items-center justify-center"
              >
                <div className="h-full w-px bg-ui-border-strong" />
              </div>
              <Link
                to={to}
                className={clx(
                  "mb-2 mt-1 flex h-8 flex-1 items-center gap-x-2 rounded-md px-2 py-2.5 text-ui-fg-subtle outline-none transition-fg hover:bg-ui-bg-subtle-hover hover:text-ui-fg-base md:py-1.5",
                  {
                    "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest hover:bg-ui-bg-base":
                      location.pathname.startsWith(to),
                  }
                )}
              >
                <Text size="small" weight="plus" leading="compact">
                  {label}
                </Text>
              </Link>
            </div>
            <ul>
              {items.map((item) => {
                return (
                  <li
                    key={item.to}
                    className="flex h-[36px] items-center gap-x-1 pl-2"
                  >
                    <div
                      role="presentation"
                      className="flex h-full w-5 items-center justify-center"
                    >
                      <div className="h-full w-px bg-ui-border-strong" />
                    </div>
                    <Link
                      to={item.to}
                      className={clx(
                        "flex h-8 flex-1 items-center gap-x-2 rounded-md px-2 py-2.5 text-ui-fg-subtle outline-none transition-fg first-of-type:mt-1 last-of-type:mb-2 hover:bg-ui-bg-subtle-hover hover:text-ui-fg-base md:py-1.5",
                        {
                          "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest hover:bg-ui-bg-base":
                            location.pathname.startsWith(item.to),
                        }
                      )}
                    >
                      <Text size="small" weight="plus" leading="compact">
                        {item.label}
                      </Text>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </div>
  )
}
