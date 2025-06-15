import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveIntegrations } from "@/components/integrations/active-integrations"
import { IntegrationSetup } from "@/components/integrations/integration-setup"
import { APIKeys } from "@/components/integrations/api-keys"

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Integrations</h1>
      <p className="text-muted-foreground">Manage connections between PinkSync and other platforms</p>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Integrations</TabsTrigger>
          <TabsTrigger value="setup">Setup New</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Integrations</CardTitle>
              <CardDescription>View and manage your current platform integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveIntegrations />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle>Setup New Integration</CardTitle>
              <CardDescription>Connect PinkSync to additional platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <IntegrationSetup />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for external services</CardDescription>
            </CardHeader>
            <CardContent>
              <APIKeys />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
