"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Copy, CheckCircle, AlertCircle } from "lucide-react"

interface DNSRecord {
  id: string
  type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS"
  name: string
  value: string
  ttl: number
  status: "active" | "pending" | "error"
}

const mockDNSRecords: DNSRecord[] = [
  {
    id: "1",
    type: "A",
    name: "pinksync.io",
    value: "192.168.1.100",
    ttl: 3600,
    status: "active",
  },
  {
    id: "2",
    type: "CNAME",
    name: "www.pinksync.io",
    value: "pinksync.io",
    ttl: 3600,
    status: "active",
  },
  {
    id: "3",
    type: "A",
    name: "api.pinksync.io",
    value: "192.168.1.101",
    ttl: 3600,
    status: "active",
  },
  {
    id: "4",
    type: "TXT",
    name: "pinksync.io",
    value: "v=spf1 include:_spf.google.com ~all",
    ttl: 3600,
    status: "active",
  },
  {
    id: "5",
    type: "MX",
    name: "pinksync.io",
    value: "10 mail.pinksync.io",
    ttl: 3600,
    status: "pending",
  },
]

export function DNSConfiguration() {
  const [records, setRecords] = useState<DNSRecord[]>(mockDNSRecords)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newRecord, setNewRecord] = useState<Partial<DNSRecord>>({
    type: "A",
    ttl: 3600,
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      A: "bg-blue-100 text-blue-800",
      AAAA: "bg-purple-100 text-purple-800",
      CNAME: "bg-green-100 text-green-800",
      MX: "bg-orange-100 text-orange-800",
      TXT: "bg-gray-100 text-gray-800",
      NS: "bg-red-100 text-red-800",
    }

    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  const handleAddRecord = () => {
    if (newRecord.name && newRecord.value && newRecord.type) {
      const record: DNSRecord = {
        id: Date.now().toString(),
        type: newRecord.type,
        name: newRecord.name,
        value: newRecord.value,
        ttl: newRecord.ttl || 3600,
        status: "pending",
      }
      setRecords([...records, record])
      setNewRecord({ type: "A", ttl: 3600 })
      setIsAddDialogOpen(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="font-medium">Total Records: </span>
            <span>{records.length}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Active: </span>
            <span className="text-green-600">{records.filter((r) => r.status === "active").length}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Pending: </span>
            <span className="text-yellow-600">{records.filter((r) => r.status === "pending").length}</span>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add DNS Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add DNS Record</DialogTitle>
              <DialogDescription>Create a new DNS record for your domain</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Record Type</Label>
                <Select
                  value={newRecord.type}
                  onValueChange={(value) => setNewRecord({ ...newRecord, type: value as DNSRecord["type"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A - IPv4 Address</SelectItem>
                    <SelectItem value="AAAA">AAAA - IPv6 Address</SelectItem>
                    <SelectItem value="CNAME">CNAME - Canonical Name</SelectItem>
                    <SelectItem value="MX">MX - Mail Exchange</SelectItem>
                    <SelectItem value="TXT">TXT - Text Record</SelectItem>
                    <SelectItem value="NS">NS - Name Server</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="subdomain.pinksync.io"
                  value={newRecord.name || ""}
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Value</Label>
                <Textarea
                  id="value"
                  placeholder="192.168.1.100 or example.com"
                  value={newRecord.value || ""}
                  onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ttl">TTL (seconds)</Label>
                <Input
                  id="ttl"
                  type="number"
                  value={newRecord.ttl || 3600}
                  onChange={(e) => setNewRecord({ ...newRecord, ttl: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRecord}>Add Record</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {records.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    {getTypeBadge(record.type)}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-mono text-sm">{record.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Value</p>
                      <p className="font-mono text-sm truncate">{record.value}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">TTL</p>
                      <p className="text-sm">{record.ttl}s</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(record.value)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
