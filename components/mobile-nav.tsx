"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { Menu, HandMetal, Home, Settings, User, Video, LogOut } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5 mr-2" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/transform",
      label: "Transform",
      icon: <Video className="h-5 w-5 mr-2" />,
      active: pathname === "/transform",
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-5 w-5 mr-2" />,
      active: pathname === "/profile",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5 mr-2" />,
      active: pathname === "/settings",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-8 mt-4">
            <HandMetal className="h-6 w-6 text-pink-600 mr-2" />
            <span className="font-bold text-xl">PinkSync</span>
          </div>

          {user ? (
            <>
              <div className="flex flex-col space-y-3">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                      route.active ? "bg-pink-100 text-pink-600" : "hover:bg-pink-50 text-muted-foreground",
                    )}
                  >
                    {route.icon}
                    {route.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto mb-4">
                <div className="border-t pt-4 mt-4">
                  <div className="px-3 py-2 text-sm font-medium">Signed in as: {user.fullName}</div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-3 mt-auto mb-4">
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild onClick={() => setOpen(false)}>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
