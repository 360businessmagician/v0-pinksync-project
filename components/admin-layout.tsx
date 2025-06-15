"use client"

import type React from "react"

import { Activity, FileText, Globe, Grid, LayoutDashboard, LineChart, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MobileNav, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/navigation"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { User } from "next-auth"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

interface AdminLayoutProps {
  children: React.ReactNode
  user: User
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, user }) => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen">
      <Sidebar className="w-64 border-r flex-col">
        <Link href="/" className="flex items-center gap-2 px-4 py-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image || ""} alt={user?.name || "Avatar"} />
            <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "AV"}</AvatarFallback>
          </Avatar>
          <span className="font-bold">{user?.name}</span>
        </Link>
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin"}>
              <Link href="/admin">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/users"}>
              <Link href="/admin/users">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/products"}>
              <Link href="/admin/products">
                <Grid className="h-4 w-4" />
                <span>Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/orders"}>
              <Link href="/admin/orders">
                <FileText className="h-4 w-4" />
                <span>Orders</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/analytics"}>
              <Link href="/admin/analytics">
                <LineChart className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/integrations"}>
              <Link href="/admin/integrations">
                <Activity className="h-4 w-4" />
                <span>Integrations</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/domains"}>
              <Link href="/domains">
                <Globe className="h-4 w-4" />
                <span>Domains</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <MobileNav className="bg-background">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/admin"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/users"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/admin/users"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Users className="h-4 w-4" />
          <span>Users</span>
        </Link>
        <Link
          href="/admin/products"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/admin/products"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Grid className="h-4 w-4" />
          <span>Products</span>
        </Link>
        <Link
          href="/admin/orders"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/admin/orders"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <FileText className="h-4 w-4" />
          <span>Orders</span>
        </Link>
        <Link
          href="/admin/analytics"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/admin/analytics"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <LineChart className="h-4 w-4" />
          <span>Analytics</span>
        </Link>
        <Link
          href="/admin/integrations"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/admin/integrations"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Activity className="h-4 w-4" />
          <span>Integrations</span>
        </Link>
        <Link
          href="/domains"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/domains"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Globe className="h-4 w-4" />
          <span>Domains</span>
        </Link>
      </MobileNav>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
