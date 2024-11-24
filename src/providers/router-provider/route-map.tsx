import { MainLayout } from "@/components/layout/main-layout"
import { RouteObject } from "react-router-dom"

export const RouteMap: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "*",
        lazy: () => import("@/routes/no-match"),
      },
      {
        path: "",
        lazy: () => import("@/routes/home"),
        handle: {
          crumb: () => "Home",
        },
      },
      {
        path: "/posts",
        handle: {
          crumb: () => "Post",
        },
        children: [
          {
            path: "create",
            lazy: () => import("@/routes/posts/post-create"),
          },
          {
            path: ":id",
            children: [
              {
                path: "edit",
                lazy: () => import("@/routes/posts/post-edit"),
              },
            ],
          },
        ],
      },
    ],
  },
]
