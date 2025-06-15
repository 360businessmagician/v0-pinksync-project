import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsageOverview } from "@/components/analytics/usage-overview"
import { PlatformComparison } from "@/components/analytics/platform-comparison"
import { UserDemographics } from "@/components/analytics/user-demographics"
import { FeatureUsage } from "@/components/analytics/feature-usage"
import { AccessibilityImpact } from "@/components/analytics/accessibility-impact"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LineChart, BarChart4, Sparkles } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Accessibility Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into accessibility usage across all platforms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/analytics/user-journeys">
              <BarChart4 className="h-4 w-4 mr-2" />
              User Journeys
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/analytics/ai-insights">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Insights
            </Link>
          </Button>
          <Button variant="outline">
            <LineChart className="h-4 w-4 mr-2" />
            Custom Reports
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Usage Overview</CardTitle>
              <CardDescription>Comprehensive view of accessibility service usage</CardDescription>
            </CardHeader>
            <CardContent>
              <UsageOverview />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms">
          <Card>
            <CardHeader>
              <CardTitle>Platform Comparison</CardTitle>
              <CardDescription>Compare accessibility usage across different platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformComparison />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
              <CardDescription>Analyze which accessibility features are most utilized</CardDescription>
            </CardHeader>
            <CardContent>
              <FeatureUsage />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>Understand your user base and their accessibility needs</CardDescription>
            </CardHeader>
            <CardContent>
              <UserDemographics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Impact</CardTitle>
              <CardDescription>Measure the real-world impact of your accessibility services</CardDescription>
            </CardHeader>
            <CardContent>
              <AccessibilityImpact />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
