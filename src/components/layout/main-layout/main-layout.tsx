import { Home } from "lucide-react"
import { NavItem, NavItemProps } from "../nav-item"
import { Shell } from "../shell"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const MainLayout = () => {
  return (
    <Shell>
      <MainSidebar />
    </Shell>
  )
}

const MainSidebar = () => {
  return (
    <aside className="flex flex-1 flex-col justify-between overflow-y-auto">
      <div className="sticky top-0">
        <Header />
      </div>
      <RouteSection />
    </aside>
  )
}

const Header = () => {
  return (
    <Link to="/" className="block px-4 pb-3 pt-2">
      Logo
    </Link>
  )
}

const useCoreRoutes = (): Omit<NavItemProps, "pathname">[] => {
  const { t } = useTranslation()
  return [
    {
      icon: (size = 20) => <Home size={size} />,
      label: t("nav.home"),
      to: "/",
    },
  ]
}

const RouteSection = () => {
  const coreRoutes = useCoreRoutes()

  return (
    <nav className="flex h-full flex-grow flex-col justify-between gap-y-3 divide-y py-4">
      {coreRoutes.map((route) => (
        <NavItem key={route.to} {...route} />
      ))}
    </nav>
  )
}
