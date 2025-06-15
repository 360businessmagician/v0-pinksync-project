import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIModelList } from "@/components/ai-models/ai-model-list"
import { ModelTraining } from "@/components/ai-models/model-training"
import { ModelPerformance } from "@/components/ai-models/model-performance"

export default function AIModelsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">AI Models</h1>
      <p className="text-muted-foreground">Manage and monitor your accessibility AI models</p>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">Model Library</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Library</CardTitle>
              <CardDescription>View and manage all your accessibility AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <AIModelList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Model Training</CardTitle>
              <CardDescription>Monitor and control AI model training processes</CardDescription>
            </CardHeader>
            <CardContent>
              <ModelTraining />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
              <CardDescription>Analyze AI model performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ModelPerformance />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
