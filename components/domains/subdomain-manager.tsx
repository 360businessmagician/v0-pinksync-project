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
import { Plus, Globe, Settings, Trash2, ExternalLink } from "lucide-react"

interface Subdomain {
  id: string
  name: string
  fullDomain: string
  service: string
  status: "active" | "inactive" | "pending"
  ssl: boolean
  target: string
  createdAt: string
}

const mockSubdomains: Subdomain[] = [
  {
    id: "1",
    name: "api",
    fullDomain: "api.pinksync.io",
    service: "API Gateway",
    status: "active",
    ssl: true,
    target: "192.168.1.101",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "admin",
    fullDomain: "admin.pinksync.io",
    service: "Admin Dashboard",
    status: "active",
    ssl: true,
    target: "192.168.1.102",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    name: "docs",
    fullDomain: "docs.pinksync.io",
    service: "Documentation",
    status: "active",
    ssl: true,
    target: "pinksync.github.io",
    createdAt: "2024-01-16",
  },
  {
    id: "4",
    name: "status",
    fullDomain: "status.pinksync.io",
    service: "Status Page",
    status: "pending",
    ssl: false,
    target: "statuspage.io",
    createdAt: "2024-01-20",
  },
  {
    id: "5",
    name: "cdn",
    fullDomain: "cdn.pinksync.io",
    service: "CDN",
    status: "inactive",
    ssl: false,
    target: "cloudfront.amazonaws.com",
    createdAt: "2024-01-18",
  },
]

export function SubdomainManager() {
  const [subdomains, setSubdomains] = useState<Subdomain[]>(mockSubdomains)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSubdomain, setNewSubdomain] = useState({
    name: "",
    service: "",
    target: "",
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      pending: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleAddSubdomain = () => {
    if (newSubdomain.name && newSubdomain.service && newSubdomain.target) {
      const subdomain: Subdomain = {
        id: Date.now().toString(),
        name: newSubdomain.name,
        fullDomain: `${newSubdomain.name}.pinksync.io`,
        service: newSubdomain.service,
        status: "pending",
        ssl: false,
        target: newSubdomain.target,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setSubdomains([...subdomains, subdomain])
      setNewSubdomain({ name: "", service: "", target: "" })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span className="font-medium">Subdomain Overview</span>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Subdomain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subdomain</DialogTitle>
              <DialogDescription>Create a new subdomain for your PinkSync services</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subdomain-name">Subdomain Name</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="subdomain-name"
                    placeholder="api"
                    value={newSubdomain.name}
                    onChange={(e) => setNewSubdomain({ ...newSubdomain, name: e.target.value })}
                  />
                  <span className="text-sm text-muted-foreground">.pinksync.io</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service">Service</Label>
                <Select
                  value={newSubdomain.service}
                  onValueChange={(value) => setNewSubdomain({ ...newSubdomain, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="API Gateway">API Gateway</SelectItem>
                    <SelectItem value="Admin Dashboard">Admin Dashboard</SelectItem>
                    <SelectItem value="Documentation">Documentation</SelectItem>
                    <SelectItem value="Status Page">Status Page</SelectItem>
                    <SelectItem value="CDN">CDN</SelectItem>
                    <SelectItem value="Staging">Staging Environment</SelectItem>
                    <SelectItem value="Testing">Testing Environment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">Target</Label>
                <Input
                  id="target"
                  placeholder="192.168.1.100 or example.com"
                  value={newSubdomain.target}
                  onChange={(e) => setNewSubdomain({ ...newSubdomain, target: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSubdomain}>Add Subdomain</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{subdomains.filter((s) => s.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{subdomains.filter((s) => s.status === "pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold">{subdomains.filter((s) => s.status === "inactive").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {subdomains.map((subdomain) => (
          <Card key={subdomain.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {subdomain.fullDomain}
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{subdomain.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(subdomain.status)}
                  {subdomain.ssl && <Badge variant="outline">SSL</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="font-mono text-sm mt-1">{subdomain.target}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-sm mt-1">{subdomain.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Actions</p>
                  <div className="flex gap-1 mt-1">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
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
