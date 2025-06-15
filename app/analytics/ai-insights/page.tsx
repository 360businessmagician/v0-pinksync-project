import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatternAnalysis } from "@/components/analytics/ai-insights/pattern-analysis"
import { AnomalyDetection } from "@/components/analytics/ai-insights/anomaly-detection"
import { RecommendationEngine } from "@/components/analytics/ai-insights/recommendation-engine"
import { PredictiveAnalytics } from "@/components/analytics/ai-insights/predictive-analytics"
import { CohortAnalysis } from "@/components/analytics/ai-insights/cohort-analysis"
import { ChurnPrediction } from "@/components/analytics/ai-insights/churn-prediction"

export default function AIInsightsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">AI Insights</h1>
      <p className="text-muted-foreground">
        AI-powered analytics to identify patterns, detect anomalies, and provide recommendations
      </p>

      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="churn">Churn Prediction</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Analysis</CardTitle>
              <CardDescription>AI-detected patterns in user journeys and behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <PatternAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>Unusual patterns and potential issues detected by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <AnomalyDetection />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommendation Engine</CardTitle>
              <CardDescription>AI-generated recommendations to improve user experience</CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationEngine />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics</CardTitle>
              <CardDescription>AI forecasts of future trends and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictiveAnalytics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Analysis</CardTitle>
              <CardDescription>Track user retention over time by cohort groups</CardDescription>
            </CardHeader>
            <CardContent>
              <CohortAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="churn">
          <Card>
            <CardHeader>
              <CardTitle>Churn Prediction</CardTitle>
              <CardDescription>Identify at-risk users before they leave the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ChurnPrediction />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
