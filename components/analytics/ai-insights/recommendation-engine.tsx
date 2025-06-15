"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, Lightbulb, ArrowRight, Check } from "lucide-react"

// Update the recommendations to reflect early-stage data
const recommendations = [
  {
    id: "rec-1",
    title: "Improve Real-time Translation Discovery",
    description: "Increase visibility of real-time translation feature to address low discovery rate",
    impact: "High",
    effort: "Medium",
    category: "Feature Discovery",
    status: "New",
    expectedOutcome: "65% increase in feature discovery",
    affectedUsers: 650,
    implementationSteps: [
      {
        title: "Add Feature Spotlight",
        description: "Implement a feature spotlight during onboarding that highlights real-time translation",
        effort: "Low",
        dependencies: [],
      },
      {
        title: "Redesign Navigation",
        description: "Move real-time translation to primary navigation",
        effort: "Medium",
        dependencies: [],
      },
      {
        title: "Add Contextual Prompts",
        description: "Implement contextual prompts after text-to-sign translations suggesting real-time translation",
        effort: "Medium",
        dependencies: [],
      },
    ],
    metrics: [
      { name: "Feature Discovery Rate", current: "35%", target: "80%", priority: "High" },
      { name: "Feature Usage", current: "22%", target: "50%", priority: "High" },
      { name: "User Satisfaction", current: "72%", target: "85%", priority: "Medium" },
    ],
    insights: [
      "65% of users never discover the real-time translation feature",
      "Users who do discover real-time translation spend 3x longer in the application",
      "Real-time translation feature is accessed from a secondary menu that's often overlooked",
    ],
  },
  {
    id: "rec-2",
    title: "Enhance Community Engagement",
    description: "Implement features to increase community contribution and participation",
    impact: "High",
    effort: "High",
    category: "Engagement",
    status: "New",
    expectedOutcome: "40% increase in community engagement",
    affectedUsers: 1000,
    implementationSteps: [
      {
        title: "Gamify Community Contributions",
        description: "Implement badges, levels, and rewards for community contributions",
        effort: "High",
        dependencies: [],
      },
      {
        title: "Highlight Community Value",
        description: "Showcase community impact statistics to users",
        effort: "Low",
        dependencies: [],
      },
      {
        title: "Simplify Contribution Process",
        description: "Reduce steps required to make community contributions",
        effort: "Medium",
        dependencies: [],
      },
    ],
    metrics: [
      { name: "Contribution Rate", current: "10%", target: "25%", priority: "High" },
      { name: "Return Frequency", current: "2x/month", target: "8x/month", priority: "High" },
      { name: "Retention Rate", current: "65%", target: "85%", priority: "Medium" },
    ],
    insights: [
      "Users who contribute to community validation return 4x more frequently",
      "Only 10% of users engage with community validation features",
      "Community contributors have 78% higher retention rate after 30 days",
    ],
  },
  {
    id: "rec-3",
    title: "Streamline Translation Saving",
    description: "Reduce translation abandonment by improving the saving process",
    impact: "Medium",
    effort: "Low",
    category: "User Experience",
    status: "In Progress",
    expectedOutcome: "45% reduction in abandoned translations",
    affectedUsers: 520,
    implementationSteps: [
      {
        title: "Streamline Saving Process",
        description: "Reduce steps required to save translations",
        effort: "Low",
        dependencies: [],
      },
      {
        title: "Implement Auto-Save",
        description: "Add automatic saving of translations with user consent",
        effort: "Medium",
        dependencies: ["Streamline Saving Process"],
      },
      {
        title: "Highlight Benefits",
        description: "Clearly communicate the benefits of saving translations",
        effort: "Low",
        dependencies: [],
      },
    ],
    metrics: [
      { name: "Abandonment Rate", current: "52%", target: "25%", priority: "High" },
      { name: "Save Rate", current: "48%", target: "75%", priority: "High" },
      { name: "Saved Translation Usage", current: "30%", target: "60%", priority: "Medium" },
    ],
    insights: [
      "52% of users abandon translations before saving or sharing",
      "Abandonment typically occurs after viewing the translation but before taking action",
      "Recent UI improvements have reduced abandonment rate by 8% month-over-month",
    ],
  },
  {
    id: "rec-4",
    title: "Platform-Specific Optimization",
    description: "Tailor feature prominence based on platform usage patterns",
    impact: "Medium",
    effort: "Medium",
    category: "Cross-Platform",
    status: "New",
    expectedOutcome: "30% more balanced feature usage across platforms",
    affectedUsers: 850,
    implementationSteps: [
      {
        title: "Platform Usage Analysis",
        description: "Conduct detailed analysis of feature usage by platform",
        effort: "Low",
        dependencies: [],
      },
      {
        title: "Platform-Specific UI Adjustments",
        description: "Customize UI and feature prominence by platform",
        effort: "High",
        dependencies: ["Platform Usage Analysis"],
      },
      {
        title: "Cross-Platform Feature Promotion",
        description: "Implement targeted promotion of underutilized features on each platform",
        effort: "Medium",
        dependencies: ["Platform Usage Analysis"],
      },
    ],
    metrics: [
      { name: "Feature Balance", current: "45%", target: "80%", priority: "High" },
      { name: "Cross-Platform Satisfaction", current: "72%", target: "85%", priority: "Medium" },
      { name: "Feature Discovery", current: "varies by platform", target: ">70% all platforms", priority: "Medium" },
    ],
    insights: [
      "Feature usage varies significantly across platforms",
      "MBTQ.dev users primarily use Text-to-Sign (85%) and Real-time Translation (92%)",
      "MBTQUniverse users focus on Video Repository (92%) and Community features (75%)",
      "VR4Deaf users heavily utilize Real-time Translation (82%) but rarely use Community features (42%)",
    ],
  },
  {
    id: "rec-5",
    title: "Session Duration Optimization",
    description: "Implement changes to increase average session duration",
    impact: "Medium",
    effort: "Medium",
    category: "Engagement",
    status: "Planned",
    expectedOutcome: "40% increase in average session duration",
    affectedUsers: 720,
    implementationSteps: [
      {
        title: "Feature Discovery Flow",
        description: "Design user flows that naturally guide users to multiple features",
        effort: "Medium",
        dependencies: [],
      },
      {
        title: "Personalization Onboarding",
        description: "Guide new users to personalize settings during onboarding",
        effort: "Medium",
        dependencies: [],
      },
      {
        title: "Community Integration",
        description: "Integrate community elements into other features",
        effort: "High",
        dependencies: ["Feature Discovery Flow"],
      },
    ],
    metrics: [
      { name: "Avg. Session Duration", current: "4.5 min", target: "7 min", priority: "High" },
      { name: "Multi-feature Usage", current: "25%", target: "60%", priority: "High" },
      { name: "Settings Customization", current: "15%", target: "50%", priority: "Medium" },
    ],
    insights: [
      "Users who access 3+ features in a session stay 2.8x longer",
      "Community engagement correlates with 3.2x longer sessions",
      "Users who customize settings have 2.5x longer average session duration",
    ],
  },
]

// Update the implementedRecommendations to reflect early-stage data
const implementedRecommendations = [
  {
    id: "impl-1",
    title: "Mobile Accessibility Improvements",
    description: "Enhanced mobile experience for Deaf users with limited bandwidth",
    impact: "High",
    effort: "High",
    category: "Accessibility",
    implementedDate: "2025-04-15",
    results: {
      status: "Success",
      metrics: [
        { name: "Mobile Usage", before: "35%", after: "58%", change: "+65%" },
        { name: "User Satisfaction", before: "68%", after: "86%", change: "+26%" },
        { name: "Session Duration", before: "3.2 min", after: "5.8 min", change: "+81%" },
      ],
      summary:
        "Implementation exceeded expectations with significant improvements in mobile usage and satisfaction. The optimized video loading for low bandwidth connections was particularly impactful.",
    },
  },
  {
    id: "impl-2",
    title: "Sign Language Search Enhancement",
    description: "Improved search functionality for the sign language video repository",
    impact: "Medium",
    effort: "Medium",
    category: "Search",
    implementedDate: "2025-03-22",
    results: {
      status: "Success",
      metrics: [
        { name: "Search Success Rate", before: "65%", after: "92%", change: "+42%" },
        { name: "Time to Find Sign", before: "45 sec", after: "12 sec", change: "-73%" },
        { name: "Repository Usage", before: "42%", after: "68%", change: "+62%" },
      ],
      summary:
        "The enhanced search functionality dramatically improved the user experience with the video repository. The addition of category filters and visual search options were particularly well-received.",
    },
  },
  {
    id: "impl-3",
    title: "Onboarding Flow Redesign",
    description: "Streamlined onboarding process with personalized pathways",
    impact: "High",
    effort: "Medium",
    category: "User Experience",
    implementedDate: "2025-02-18",
    results: {
      status: "Mixed",
      metrics: [
        { name: "Completion Rate", before: "62%", after: "78%", change: "+26%" },
        { name: "Feature Discovery", before: "35%", after: "65%", change: "+86%" },
        { name: "Time to First Translation", before: "3.5 min", after: "4.2 min", change: "+20%" },
      ],
      summary:
        "While the redesign significantly improved feature discovery and completion rates, it unexpectedly increased the time to first translation. Further optimization is needed to streamline the initial translation experience.",
    },
  },
  {
    id: "impl-4",
    title: "Community Contribution Simplification",
    description: "Reduced steps required to contribute sign language videos",
    impact: "Medium",
    effort: "Low",
    category: "Community",
    implementedDate: "2025-01-30",
    results: {
      status: "Success",
      metrics: [
        { name: "Contribution Rate", before: "5%", after: "12%", change: "+140%" },
        { name: "Contribution Completion", before: "58%", after: "85%", change: "+47%" },
        { name: "New Contributors", before: "12/month", after: "35/month", change: "+192%" },
      ],
      summary:
        "The simplified contribution process dramatically increased both the number of contributors and the completion rate. The mobile recording option was particularly successful in attracting new contributors.",
    },
  },
  {
    id: "impl-5",
    title: "Real-time Translation Performance",
    description: "Optimized performance of real-time translation feature",
    impact: "High",
    effort: "High",
    category: "Performance",
    implementedDate: "2025-01-05",
    results: {
      status: "Success",
      metrics: [
        { name: "Response Time", before: "850ms", after: "220ms", change: "-74%" },
        { name: "Error Rate", before: "8.5%", after: "2.1%", change: "-75%" },
        { name: "User Satisfaction", before: "72%", after: "91%", change: "+26%" },
      ],
      summary:
        "Performance optimizations significantly improved the real-time translation experience. The reduced latency and error rates led to much higher user satisfaction and increased usage of the feature.",
    },
  },
]

export function RecommendationEngine() {
  const [category, setCategory] = useState("all")
  const [impact, setImpact] = useState("all")
  const [effort, setEffort] = useState("all")
  const [view, setView] = useState("new")
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
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

  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case "High":
        return <Badge className="bg-yellow-500">High Effort</Badge>
      case "Medium":
        return <Badge className="bg-blue-500">Medium Effort</Badge>
      case "Low":
        return <Badge className="bg-green-500">Low Effort</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge className="bg-blue-500">New</Badge>
      case "In Progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>
      case "Planned":
        return <Badge className="bg-purple-500">Planned</Badge>
      case "Implemented":
        return <Badge className="bg-green-500">Implemented</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getResultBadge = (status: string) => {
    switch (status) {
      case "Success":
        return <Badge className="bg-green-500">Success</Badge>
      case "Mixed":
        return <Badge className="bg-yellow-500">Mixed Results</Badge>
      case "Limited":
        return <Badge className="bg-red-500">Limited Impact</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getChangeIndicator = (change: string) => {
    if (change.startsWith("+")) {
      return <ArrowRight className="h-4 w-4 text-green-500 rotate-45" />
    } else if (change.startsWith("-")) {
      return <ArrowRight className="h-4 w-4 text-green-500 rotate-[135deg]" />
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="all" onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Feature Discovery">Feature Discovery</SelectItem>
              <SelectItem value="Engagement">Engagement</SelectItem>
              <SelectItem value="User Experience">User Experience</SelectItem>
              <SelectItem value="Cross-Platform">Cross-Platform</SelectItem>
              <SelectItem value="Accessibility">Accessibility</SelectItem>
              <SelectItem value="Performance">Performance</SelectItem>
              <SelectItem value="Community">Community</SelectItem>
              <SelectItem value="Search">Search</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setImpact}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Impact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Impact Levels</SelectItem>
              <SelectItem value="High">High Impact</SelectItem>
              <SelectItem value="Medium">Medium Impact</SelectItem>
              <SelectItem value="Low">Low Impact</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setEffort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Effort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Effort Levels</SelectItem>
              <SelectItem value="High">High Effort</SelectItem>
              <SelectItem value="Medium">Medium Effort</SelectItem>
              <SelectItem value="Low">Low Effort</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="new" onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New Recommendations</SelectItem>
              <SelectItem value="implemented">Implemented</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {view === "new" && (
        <>
          {selectedRecommendation ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Recommendation: {recommendations.find((r) => r.id === selectedRecommendation)?.title}
                </h3>
                <Button variant="outline" onClick={() => setSelectedRecommendation(null)}>
                  Back to Recommendations
                </Button>
              </div>

              {recommendations
                .filter((recommendation) => recommendation.id === selectedRecommendation)
                .map((recommendation) => (
                  <div key={recommendation.id} className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{recommendation.title}</CardTitle>
                            <CardDescription>{recommendation.description}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getImpactBadge(recommendation.impact)}
                            {getEffortBadge(recommendation.effort)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Category</h4>
                            <Badge variant="outline">{recommendation.category}</Badge>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Status</h4>
                            <div>{getStatusBadge(recommendation.status)}</div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Affected Users</h4>
                            <p>{recommendation.affectedUsers.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-medium mb-2">Expected Outcome</h4>
                          <p className="text-sm">{recommendation.expectedOutcome}</p>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-medium mb-2">AI Insights</h4>
                          <ul className="space-y-1">
                            {recommendation.insights.map((insight, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Implementation Steps</CardTitle>
                          <CardDescription>Recommended approach to implement this change</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {recommendation.implementationSteps.map((step, index) => (
                              <div key={index} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium">{step.title}</h3>
                                  {getEffortBadge(step.effort)}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
                                {step.dependencies.length > 0 && (
                                  <div className="mt-3">
                                    <h4 className="text-xs font-medium text-muted-foreground">Dependencies</h4>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {step.dependencies.map((dep, i) => (
                                        <Badge key={i} variant="outline">
                                          {dep}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Success Metrics</CardTitle>
                          <CardDescription>Key metrics to track for this recommendation</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {recommendation.metrics.map((metric, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{metric.name}</span>
                                    <Badge
                                      className={
                                        metric.priority === "High"
                                          ? "bg-pink-600"
                                          : metric.priority === "Medium"
                                            ? "bg-pink-400"
                                            : "bg-pink-200"
                                      }
                                    >
                                      {metric.priority}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="w-20">Current:</span>
                                  <span className="font-medium">{metric.current}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="w-20">Target:</span>
                                  <span className="font-medium">{metric.target}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                                  <div
                                    className="bg-pink-600 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (Number.parseInt(metric.current.replace(/[^0-9]/g, "")) /
                                          Number.parseInt(metric.target.replace(/[^0-9]/g, ""))) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Implementation Plan</CardTitle>
                        <CardDescription>Suggested timeline and resources</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Estimated Timeline</h4>
                              <p className="text-sm">
                                {recommendation.effort === "High"
                                  ? "4-6 weeks"
                                  : recommendation.effort === "Medium"
                                    ? "2-3 weeks"
                                    : "1-2 weeks"}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Suggested Team</h4>
                              <p className="text-sm">
                                {recommendation.category === "Feature Discovery" ||
                                recommendation.category === "User Experience"
                                  ? "UX Team + Frontend Engineers"
                                  : recommendation.category === "Engagement" || recommendation.category === "Community"
                                    ? "Product Team + Full Stack Engineers"
                                    : recommendation.category === "Cross-Platform"
                                      ? "Cross-Platform Team + UX"
                                      : "Backend Team + Data Scientists"}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Priority</h4>
                              <Badge
                                className={
                                  recommendation.impact === "High"
                                    ? "bg-pink-600"
                                    : recommendation.impact === "Medium"
                                      ? "bg-pink-400"
                                      : "bg-pink-200"
                                }
                              >
                                {recommendation.impact === "High"
                                  ? "High Priority"
                                  : recommendation.impact === "Medium"
                                    ? "Medium Priority"
                                    : "Low Priority"}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Implementation Approach</h4>
                            <p className="text-sm">
                              {recommendation.effort === "Low"
                                ? "This is a relatively straightforward implementation that can be completed quickly. Consider implementing as part of the next sprint cycle."
                                : recommendation.effort === "Medium"
                                  ? "This implementation requires moderate effort and coordination between teams. Plan for a dedicated sprint or phase the implementation across multiple sprints."
                                  : "This is a complex implementation requiring significant resources and planning. Consider breaking down into smaller phases and implementing over multiple sprint cycles."}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Testing Recommendations</h4>
                            <p className="text-sm">
                              {recommendation.category === "Feature Discovery" ||
                              recommendation.category === "User Experience"
                                ? "Conduct usability testing with a focus group of Deaf users before full deployment. A/B test different approaches to measure effectiveness."
                                : recommendation.category === "Engagement" || recommendation.category === "Community"
                                  ? "Implement with a subset of users first and monitor engagement metrics closely. Gather qualitative feedback through surveys and interviews."
                                  : recommendation.category === "Cross-Platform"
                                    ? "Test thoroughly across all supported platforms. Consider a phased rollout starting with the platform that has the highest usage."
                                    : "Implement comprehensive performance testing before deployment. Monitor key metrics closely after implementation."}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations
                .filter((recommendation) => {
                  if (category !== "all" && recommendation.category !== category) return false
                  if (impact !== "all" && recommendation.impact !== impact) return false
                  if (effort !== "all" && recommendation.effort !== effort) return false
                  return true
                })
                .map((recommendation) => (
                  <Card
                    key={recommendation.id}
                    className="cursor-pointer hover:border-pink-200 dark:hover:border-pink-800 transition-colors"
                    onClick={() => setSelectedRecommendation(recommendation.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 mt-1 text-pink-500" />
                          <div>
                            <h3 className="font-medium">{recommendation.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getImpactBadge(recommendation.impact)}
                          {getEffortBadge(recommendation.effort)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                          Affects {recommendation.affectedUsers.toLocaleString()} users • Expected outcome:{" "}
                          {recommendation.expectedOutcome}
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline">{recommendation.category}</Badge>
                          {getStatusBadge(recommendation.status)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </>
      )}

      {view === "implemented" && (
        <div className="space-y-6">
          {implementedRecommendations
            .filter((recommendation) => {
              if (category !== "all" && recommendation.category !== category) return false
              if (impact !== "all" && recommendation.impact !== impact) return false
              if (effort !== "all" && recommendation.effort !== effort) return false
              return true
            })
            .map((recommendation) => (
              <Card key={recommendation.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{recommendation.title}</CardTitle>
                      <CardDescription>{recommendation.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getImpactBadge(recommendation.impact)}
                      {getEffortBadge(recommendation.effort)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Implemented on</span>
                        <p className="font-medium">{recommendation.implementedDate}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Category</span>
                        <p>
                          <Badge variant="outline">{recommendation.category}</Badge>
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Result</span>
                        <p>{getResultBadge(recommendation.results.status)}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Impact Metrics</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left py-2">Metric</th>
                              <th className="text-left py-2">Before</th>
                              <th className="text-left py-2">After</th>
                              <th className="text-left py-2">Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recommendation.results.metrics.map((metric, index) => (
                              <tr key={index} className="border-t">
                                <td className="py-3 font-medium">{metric.name}</td>
                                <td className="py-3">{metric.before}</td>
                                <td className="py-3">{metric.after}</td>
                                <td className="py-3">
                                  <div className="flex items-center gap-1">
                                    {getChangeIndicator(metric.change)}
                                    <span
                                      className={
                                        metric.change.startsWith("+") || metric.change.startsWith("-")
                                          ? "text-green-600 dark:text-green-400 font-medium"
                                          : ""
                                      }
                                    >
                                      {metric.change}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Summary</h4>
                      <p className="text-sm">{recommendation.results.summary}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium">Recommendation successfully implemented</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Full Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}
