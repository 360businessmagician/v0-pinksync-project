import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JourneyFlowVisualization } from "@/components/analytics/user-journeys/journey-flow"
import { PathAnalysis } from "@/components/analytics/user-journeys/path-analysis"
import { FeatureFunnels } from "@/components/analytics/user-journeys/feature-funnels"
import { SessionReplays } from "@/components/analytics/user-journeys/session-replays"

export default function UserJourneysPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">User Journey Analysis</h1>
      <p className="text-muted-foreground">Visualize how users navigate through PinkSync's accessibility features</p>

      <Tabs defaultValue="flow" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flow">Feature Flow</TabsTrigger>
          <TabsTrigger value="paths">Path Analysis</TabsTrigger>
          <TabsTrigger value="funnels">Feature Funnels</TabsTrigger>
          <TabsTrigger value="sessions">Session Replays</TabsTrigger>
        </TabsList>

        <TabsContent value="flow">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flow Visualization</CardTitle>
              <CardDescription>See how users move between different accessibility features</CardDescription>
            </CardHeader>
            <CardContent>
              <JourneyFlowVisualization />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paths">
          <Card>
            <CardHeader>
              <CardTitle>Path Analysis</CardTitle>
              <CardDescription>Analyze common paths and identify potential bottlenecks</CardDescription>
            </CardHeader>
            <CardContent>
              <PathAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnels">
          <Card>
            <CardHeader>
              <CardTitle>Feature Funnels</CardTitle>
              <CardDescription>Track conversion through key user journeys</CardDescription>
            </CardHeader>
            <CardContent>
              <FeatureFunnels />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Session Replays</CardTitle>
              <CardDescription>Watch anonymized user sessions to understand behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <SessionReplays />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
