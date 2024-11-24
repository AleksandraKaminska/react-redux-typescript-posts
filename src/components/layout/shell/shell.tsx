import { clx } from "../../ui"
import { PropsWithChildren } from "react"
import { Link, Outlet, UIMatch, useMatches } from "react-router-dom"

export const Shell = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid h-screen grid-cols-[14rem_1fr] items-start overflow-hidden">
      <SidebarContainer>{children}</SidebarContainer>
      <div className="flex h-screen w-full flex-col overflow-auto">
        <Topbar />
        <main className="flex h-full w-full max-w-[1800px] flex-col gap-y-2 overflow-y-auto p-3">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

const Breadcrumbs = () => {
  const matches = useMatches() as UIMatch<
    unknown,
    { crumb?: (data?: unknown) => string }
  >[]

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => {
      const { handle, data, pathname, params } = match

      return {
        label: handle.crumb!(data ?? params.category),
        path: pathname,
      }
    })

  return (
    <ol className={clx("flex select-none items-center text-ui-fg-muted")}>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1
        const isSingle = crumbs.length === 1

        return (
          <li
            key={index}
            className={clx("txt-compact-small-plus flex items-center", {
              "text-ui-fg-subtle": isLast,
            })}
          >
            {!isLast ? (
              <Link
                className="transition-fg hover:text-ui-fg-subtle"
                to={crumb.path}
              >
                {crumb.label}
              </Link>
            ) : (
              <div>
                {!isSingle && <span className="block lg:hidden">...</span>}
                <span
                  key={index}
                  className={clx("capitalize", {
                    "hidden lg:block": !isSingle,
                  })}
                >
                  {crumb.label}
                </span>
              </div>
            )}
            {!isLast && <span className="mx-2 -mt-0.5">›</span>}
          </li>
        )
      })}
    </ol>
  )
}

const Topbar = () => {
  return (
    <div
      className={clx("grid w-full grid-cols-2 border-b px-3", { "py-3": open })}
    >
      <div className="flex items-center gap-x-1.5">
        <Breadcrumbs />
      </div>
    </div>
  )
}

const SidebarContainer = ({ children }: PropsWithChildren) => {
  return <div className="flex h-screen border-r">{children}</div>
}
