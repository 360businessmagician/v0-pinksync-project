import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignLibrary } from "@/components/sign-repository/sign-library"
import { ContributionManager } from "@/components/sign-repository/contribution-manager"
import { QualityControl } from "@/components/sign-repository/quality-control"

export default function SignRepositoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Sign Language Repository</h1>
      <p className="text-muted-foreground">Manage and curate your sign language video database</p>

      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="library">Sign Library</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
        </TabsList>

        <TabsContent value="library">
          <Card>
            <CardHeader>
              <CardTitle>Sign Language Library</CardTitle>
              <CardDescription>Browse and manage all sign language videos</CardDescription>
            </CardHeader>
            <CardContent>
              <SignLibrary />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributions">
          <Card>
            <CardHeader>
              <CardTitle>Community Contributions</CardTitle>
              <CardDescription>Review and approve community-contributed sign videos</CardDescription>
            </CardHeader>
            <CardContent>
              <ContributionManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Quality Control</CardTitle>
              <CardDescription>Ensure high-quality sign language videos</CardDescription>
            </CardHeader>
            <CardContent>
              <QualityControl />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
