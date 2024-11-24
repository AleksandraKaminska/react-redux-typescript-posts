import { isValidElement } from "react"
import { render as rtlRender } from "@testing-library/react"
import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom"

export function render(children: any, routes: RouteObject[] = []) {
  const options: RouteObject = isValidElement(children)
    ? { element: children, path: "/" }
    : children

  const router = createMemoryRouter([{ ...options }, ...routes], {
    initialEntries: options.path ? [options.path] : [],
    initialIndex: 1,
  })

  return rtlRender(<RouterProvider router={router} />)
}
