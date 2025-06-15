import { Badge } from "@/components/ui/badge"

const services = [
  {
    name: "Text-to-Sign API",
    status: "Operational",
    uptime: "99.98%",
    lastIncident: "None",
  },
  {
    name: "Sign Repository",
    status: "Operational",
    uptime: "99.95%",
    lastIncident: "3 days ago",
  },
  {
    name: "AI Model Training",
    status: "Active",
    uptime: "100%",
    lastIncident: "None",
  },
  {
    name: "Integration Hub",
    status: "Operational",
    uptime: "99.99%",
    lastIncident: "None",
  },
  {
    name: "Authentication Service",
    status: "Operational",
    uptime: "99.97%",
    lastIncident: "7 days ago",
  },
]

export function ServiceStatus() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-500"
      case "Active":
        return "bg-blue-500"
      case "Degraded":
        return "bg-yellow-500"
      case "Outage":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{service.name}</p>
            <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
          </div>
          <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
        </div>
      ))}
    </div>
  )
}
