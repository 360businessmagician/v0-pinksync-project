"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data
const integrations = [
  {
    name: "MBTQ.dev",
    type: "Developer Platform",
    status: "Active",
    usageLevel: "High",
    lastSync: "5 minutes ago",
    dateConnected: "2024-12-10",
  },
  {
    name: "MBTQUniverse.com",
    type: "Public Hub",
    status: "Active",
    usageLevel: "High",
    lastSync: "10 minutes ago",
    dateConnected: "2024-12-15",
  },
  {
    name: "VR4Deaf",
    type: "VR Platform",
    status: "Active",
    usageLevel: "Medium",
    lastSync: "30 minutes ago",
    dateConnected: "2025-01-05",
  },
  {
    name: "360 Magicians",
    type: "Career Platform",
    status: "Active",
    usageLevel: "Medium",
    lastSync: "1 hour ago",
    dateConnected: "2025-01-12",
  },
  {
    name: "MBTQ Group",
    type: "Financial Services",
    status: "Active",
    usageLevel: "Low",
    lastSync: "3 hours ago",
    dateConnected: "2025-02-01",
  },
  {
    name: "DeafAuth",
    type: "Authentication",
    status: "Maintenance",
    usageLevel: "Low",
    lastSync: "1 day ago",
    dateConnected: "2025-02-10",
  },
]

export function ActiveIntegrations() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Maintenance":
        return "bg-yellow-500"
      case "Inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUsageLevelColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-blue-500"
      case "Medium":
        return "bg-purple-500"
      case "Low":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search integrations..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Usage Level</TableHead>
            <TableHead>Last Sync</TableHead>
            <TableHead>Date Connected</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIntegrations.map((integration, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{integration.name}</TableCell>
              <TableCell>{integration.type}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getUsageLevelColor(integration.usageLevel)}>{integration.usageLevel}</Badge>
              </TableCell>
              <TableCell>{integration.lastSync}</TableCell>
              <TableCell>{integration.dateConnected}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Configuration</DropdownMenuItem>
                    <DropdownMenuItem>View Logs</DropdownMenuItem>
                    <DropdownMenuItem>Force Sync</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Disconnect</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
