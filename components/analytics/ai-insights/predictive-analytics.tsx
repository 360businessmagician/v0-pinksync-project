"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"

// Sample data for usage forecasts
const usageForecastData = [
  {
    month: "Jan",
    actual: 0,
    forecast: 0,
    optimistic: 0,
    pessimistic: 0,
  },
  {
    month: "Feb",
    actual: 120,
    forecast: 120,
    optimistic: 120,
    pessimistic: 120,
  },
  {
    month: "Mar",
    actual: 450,
    forecast: 450,
    optimistic: 450,
    pessimistic: 450,
  },
  {
    month: "Apr",
    actual: 1200,
    forecast: 1200,
    optimistic: 1200,
    pessimistic: 1200,
  },
  {
    month: "May",
    actual: 2800,
    forecast: 2800,
    optimistic: 2800,
    pessimistic: 2800,
  },
  {
    month: "Jun",
    actual: 5500,
    forecast: 5500,
    optimistic: 5500,
    pessimistic: 5500,
  },
  {
    month: "Jul",
    forecast: 8500,
    optimistic: 9200,
    pessimistic: 7800,
  },
  {
    month: "Aug",
    forecast: 12000,
    optimistic: 14000,
    pessimistic: 10000,
  },
  {
    month: "Sep",
    forecast: 16500,
    optimistic: 19000,
    pessimistic: 14000,
  },
  {
    month: "Oct",
    forecast: 22000,
    optimistic: 26000,
    pessimistic: 18000,
  },
  {
    month: "Nov",
    forecast: 28000,
    optimistic: 34000,
    pessimistic: 22000,
  },
  {
    month: "Dec",
    forecast: 35000,
    optimistic: 42000,
    pessimistic: 28000,
  },
]

// Sample data for feature adoption forecasts
const featureAdoptionData = [
  {
    feature: "Text-to-Sign",
    current: 15,
    forecast3m: 35,
    forecast6m: 55,
    forecast12m: 75,
  },
  {
    feature: "Video Repository",
    current: 12,
    forecast3m: 28,
    forecast6m: 45,
    forecast12m: 65,
  },
  {
    feature: "Real-time Translation",
    current: 8,
    forecast3m: 20,
    forecast6m: 38,
    forecast12m: 60,
  },
  {
    feature: "Community Validation",
    current: 5,
    forecast3m: 15,
    forecast6m: 28,
    forecast12m: 45,
  },
  {
    feature: "Settings Customization",
    current: 3,
    forecast3m: 10,
    forecast6m: 22,
    forecast12m: 40,
  },
]

// Sample data for platform growth forecasts
const platformGrowthData = [
  {
    platform: "MBTQ.dev",
    current: 2500,
    forecast3m: 6000,
    forecast6m: 12000,
    forecast12m: 25000,
    growthRate: 900,
  },
  {
    platform: "MBTQUniverse",
    current: 1800,
    forecast3m: 4500,
    forecast6m: 9000,
    forecast12m: 20000,
    growthRate: 1011,
  },
  {
    platform: "VR4Deaf",
    current: 1200,
    forecast3m: 3500,
    forecast6m: 7500,
    forecast12m: 18000,
    growthRate: 1400,
  },
  {
    platform: "360 Magicians",
    current: 800,
    forecast3m: 2500,
    forecast6m: 6000,
    forecast12m: 15000,
    growthRate: 1775,
  },
  {
    platform: "MBTQ Group",
    current: 300,
    forecast3m: 1200,
    forecast6m: 3500,
    forecast12m: 8000,
    growthRate: 2567,
  },
]

// Sample data for user segment forecasts
const userSegmentData = [
  {
    segment: "Deaf Users",
    current: 3500,
    forecast3m: 8000,
    forecast6m: 15000,
    forecast12m: 30000,
    growthRate: 757,
  },
  {
    segment: "Hard of Hearing",
    current: 2200,
    forecast3m: 5500,
    forecast6m: 12000,
    forecast12m: 25000,
    growthRate: 1036,
  },
  {
    segment: "Interpreters",
    current: 1000,
    forecast3m: 2800,
    forecast6m: 6500,
    forecast12m: 15000,
    growthRate: 1400,
  },
  {
    segment: "Educators",
    current: 500,
    forecast3m: 1800,
    forecast6m: 4500,
    forecast12m: 12000,
    growthRate: 2300,
  },
  {
    segment: "Students",
    current: 200,
    forecast3m: 1200,
    forecast6m: 3500,
    forecast12m: 10000,
    growthRate: 4900,
  },
]

// Sample data for key events
const keyEvents = [
  {
    date: "Jul 15, 2025",
    event: "Real-time Translation V3 Launch",
    impact: "High",
    description: "Major update to real-time translation with improved accuracy and lower latency",
    affectedMetrics: ["User Engagement", "Translation Usage", "Session Duration"],
    predictedImpact: "+25% in real-time translation usage",
  },
  {
    date: "Aug 10, 2025",
    event: "MBTQUniverse Integration Expansion",
    impact: "Medium",
    description: "Expanded integration with MBTQUniverse platform",
    affectedMetrics: ["Cross-platform Usage", "User Growth", "Feature Discovery"],
    predictedImpact: "+15% in cross-platform engagement",
  },
  {
    date: "Sep 5, 2025",
    event: "Community Contribution Gamification",
    impact: "Medium",
    description: "Launch of gamified community contribution system",
    affectedMetrics: ["Community Engagement", "Content Growth", "User Retention"],
    predictedImpact: "+40% in community contributions",
  },
  {
    date: "Oct 20, 2025",
    event: "Mobile App Redesign",
    impact: "High",
    description: "Complete redesign of mobile experience with improved accessibility",
    affectedMetrics: ["Mobile Usage", "User Satisfaction", "Session Duration"],
    predictedImpact: "+35% in mobile engagement",
  },
  {
    date: "Nov 15, 2025",
    event: "AI Model V4 Deployment",
    impact: "High",
    description: "Next generation AI model with support for 5 new sign languages",
    affectedMetrics: ["Translation Accuracy", "User Growth", "Geographic Expansion"],
    predictedImpact: "+20% in overall platform usage",
  },
]

export function PredictiveAnalytics() {
  const [timeRange, setTimeRange] = useState("12months")
  const [forecastType, setForecastType] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return <Badge className="bg-pink-600">High Impact</Badge>
      case "Medium":
        return <Badge className="bg-pink-400">Medium Impact</Badge>
      case "Low":
        return <Badge className="bg-pink-200 text-gray-800">Low Impact</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getGrowthIndicator = (growth: number) => {
    if (growth >= 150) {
      return <Badge className="bg-green-600">High Growth</Badge>
    } else if (growth >= 100) {
      return <Badge className="bg-green-500">Medium Growth</Badge>
    } else {
      return <Badge className="bg-blue-500">Stable Growth</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="12months" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Forecast Horizon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setForecastType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Forecast Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Forecasts</SelectItem>
              <SelectItem value="usage">Usage Forecasts</SelectItem>
              <SelectItem value="features">Feature Adoption</SelectItem>
              <SelectItem value="platforms">Platform Growth</SelectItem>
              <SelectItem value="segments">User Segments</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>\
        </div>
