import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    user: "System",
    action: "AI Model Updated",
    target: "Text-to-Sign Generator",
    time: "2 minutes ago",
    icon: "🤖",
  },
  {
    user: "Sarah Chen",
    action: "Added new sign",
    target: "Community",
    time: "15 minutes ago",
    icon: "👋",
  },
  {
    user: "MBTQ.dev",
    action: "New API integration",
    target: "Developer Platform",
    time: "1 hour ago",
    icon: "🔌",
  },
  {
    user: "VR4Deaf",
    action: "Accessibility report",
    target: "Monthly Analysis",
    time: "3 hours ago",
    icon: "📊",
  },
  {
    user: "System",
    action: "Database backup",
    target: "Sign Repository",
    time: "5 hours ago",
    icon: "💾",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>{activity.icon}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user}
              <span className="text-muted-foreground"> {activity.action}</span>
            </p>
            <p className="text-sm text-muted-foreground">{activity.target}</p>
          </div>
          <div className="ml-auto font-medium text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
