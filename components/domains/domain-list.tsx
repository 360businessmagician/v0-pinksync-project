"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Plus, Settings, Shield, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface Domain {
  id: string
  name: string
  status: "active" | "pending" | "error"
  ssl: boolean
  verified: boolean
  service: string
  createdAt: string
}

const mockDomains: Domain[] = [
  {
    id: "1",
    name: "pinksync.io",
    status: "active",
    ssl: true,
    verified: true,
    service: "Main Platform",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "api.pinksync.io",
    status: "active",
    ssl: true,
    verified: true,
    service: "API Gateway",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    name: "admin.pinksync.io",
    status: "active",
    ssl: true,
    verified: true,
    service: "Admin Dashboard",
    createdAt: "2024-01-15",
  },
  {
    id: "4",
    name: "cdn.pinksync.io",
    status: "pending",
    ssl: false,
    verified: false,
    service: "CDN",
    createdAt: "2024-01-20",
  },
]

export function DomainList() {
  const [domains, setDomains] = useState<Domain[]>(mockDomains)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDomain, setNewDomain] = useState("")
  const [newService, setNewService] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      pending: "secondary",
      error: "destructive",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleAddDomain = () => {
    if (newDomain && newService) {
      const domain: Domain = {
        id: Date.now().toString(),
        name: newDomain,
        status: "pending",
        ssl: false,
        verified: false,
        service: newService,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setDomains([...domains, domain])
      setNewDomain("")
      setNewService("")
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <span className="font-medium">Active Domains: {domains.filter((d) => d.status === "active").length}</span>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Domain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Domain</DialogTitle>
              <DialogDescription>Configure a new domain for your PinkSync services</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="domain">Domain Name</Label>
                <Input
                  id="domain"
                  placeholder="example.pinksync.io"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service">Service</Label>
                <Select value={newService} onValueChange={setNewService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Platform">Main Platform</SelectItem>
                    <SelectItem value="API Gateway">API Gateway</SelectItem>
                    <SelectItem value="Admin Dashboard">Admin Dashboard</SelectItem>
                    <SelectItem value="CDN">CDN</SelectItem>
                    <SelectItem value="Documentation">Documentation</SelectItem>
                    <SelectItem value="Status Page">Status Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDomain}>Add Domain</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {domains.map((domain) => (
          <Card key={domain.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(domain.status)}
                  <div>
                    <CardTitle className="text-lg">{domain.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{domain.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(domain.status)}
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">SSL Certificate</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Shield className={`h-4 w-4 ${domain.ssl ? "text-green-500" : "text-gray-400"}`} />
                    <span>{domain.ssl ? "Active" : "Not Configured"}</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Domain Verified</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className={`h-4 w-4 ${domain.verified ? "text-green-500" : "text-gray-400"}`} />
                    <span>{domain.verified ? "Yes" : "Pending"}</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="mt-1">{domain.createdAt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Actions</p>
                  <div className="flex gap-1 mt-1">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      Verify
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
