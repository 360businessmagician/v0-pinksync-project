"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, RefreshCw, Download, AlertTriangle, CheckCircle, Calendar } from "lucide-react"

interface SSLCertificate {
  id: string
  domain: string
  issuer: string
  status: "active" | "expiring" | "expired" | "pending"
  validFrom: string
  validTo: string
  daysUntilExpiry: number
  autoRenew: boolean
  type: "Let's Encrypt" | "Custom" | "Wildcard"
}

const mockCertificates: SSLCertificate[] = [
  {
    id: "1",
    domain: "pinksync.io",
    issuer: "Let's Encrypt",
    status: "active",
    validFrom: "2024-01-15",
    validTo: "2024-04-15",
    daysUntilExpiry: 45,
    autoRenew: true,
    type: "Let's Encrypt",
  },
  {
    id: "2",
    domain: "*.pinksync.io",
    issuer: "Let's Encrypt",
    status: "active",
    validFrom: "2024-01-15",
    validTo: "2024-04-15",
    daysUntilExpiry: 45,
    autoRenew: true,
    type: "Wildcard",
  },
  {
    id: "3",
    domain: "api.pinksync.io",
    issuer: "Let's Encrypt",
    status: "expiring",
    validFrom: "2023-12-01",
    validTo: "2024-03-01",
    daysUntilExpiry: 15,
    autoRenew: false,
    type: "Let's Encrypt",
  },
]

export function SSLCertificates() {
  const [certificates, setCertificates] = useState<SSLCertificate[]>(mockCertificates)

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "default" as const, icon: CheckCircle, color: "text-green-500" },
      expiring: { variant: "secondary" as const, icon: AlertTriangle, color: "text-yellow-500" },
      expired: { variant: "destructive" as const, icon: AlertTriangle, color: "text-red-500" },
      pending: { variant: "secondary" as const, icon: RefreshCw, color: "text-blue-500" },
    }

    const config = variants[status as keyof typeof variants] || variants.pending
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getExpiryProgress = (daysUntilExpiry: number) => {
    const totalDays = 90 // Assuming 90-day certificates
    const progress = Math.max(0, Math.min(100, (daysUntilExpiry / totalDays) * 100))
    return progress
  }

  const getExpiryColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry <= 7) return "bg-red-500"
    if (daysUntilExpiry <= 30) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="font-medium">SSL Status Overview</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Request Certificate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{certificates.filter((c) => c.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold">{certificates.filter((c) => c.status === "expiring").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Auto-Renew</p>
                <p className="text-2xl font-bold">{certificates.filter((c) => c.autoRenew).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Wildcard</p>
                <p className="text-2xl font-bold">{certificates.filter((c) => c.type === "Wildcard").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {certificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <CardTitle className="text-lg">{cert.domain}</CardTitle>
                    <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(cert.status)}
                  <Badge variant="outline">{cert.type}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Valid From</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{cert.validFrom}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valid To</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{cert.validTo}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Until Expiry</p>
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{cert.daysUntilExpiry} days</span>
                      {cert.autoRenew && (
                        <Badge variant="outline" className="text-xs">
                          Auto-renew
                        </Badge>
                      )}
                    </div>
                    <Progress value={getExpiryProgress(cert.daysUntilExpiry)} className="mt-1 h-2" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Actions</p>
                  <div className="flex gap-1 mt-1">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
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
