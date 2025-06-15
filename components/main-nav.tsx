"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { HandMetal, Home, Settings, User, Video, LogOut } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-4 w-4 mr-2" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/transform",
      label: "Transform",
      icon: <Video className="h-4 w-4 mr-2" />,
      active: pathname === "/transform",
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-4 w-4 mr-2" />,
      active: pathname === "/profile",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      active: pathname === "/settings",
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center mr-6">
        <HandMetal className="h-6 w-6 text-pink-600 mr-2" />
        <span className="font-bold text-xl">PinkSync</span>
      </Link>

      {user && (
        <>
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-pink-600 flex items-center",
                  route.active ? "text-pink-600" : "text-muted-foreground",
                )}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm font-medium hidden md:block">{user.fullName}</span>
            <Button variant="ghost" size="sm" onClick={logout} className="flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </>
      )}

      {!user && (
        <div className="ml-auto space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
