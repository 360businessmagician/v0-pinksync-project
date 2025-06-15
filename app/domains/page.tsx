import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DomainList } from "@/components/domains/domain-list"
import { DNSConfiguration } from "@/components/domains/dns-configuration"
import { SSLCertificates } from "@/components/domains/ssl-certificates"
import { SubdomainManager } from "@/components/domains/subdomain-manager"

export default function DomainsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Domain Configuration</h1>
          <p className="text-muted-foreground">Manage domains, DNS, and SSL certificates for PinkSync</p>
        </div>
      </div>

      <Tabs defaultValue="domains" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="dns">DNS Settings</TabsTrigger>
          <TabsTrigger value="ssl">SSL Certificates</TabsTrigger>
          <TabsTrigger value="subdomains">Subdomains</TabsTrigger>
        </TabsList>

        <TabsContent value="domains">
          <Card>
            <CardHeader>
              <CardTitle>Domain Management</CardTitle>
              <CardDescription>Configure and manage your domains</CardDescription>
            </CardHeader>
            <CardContent>
              <DomainList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dns">
          <Card>
            <CardHeader>
              <CardTitle>DNS Configuration</CardTitle>
              <CardDescription>Manage DNS records and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <DNSConfiguration />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ssl">
          <Card>
            <CardHeader>
              <CardTitle>SSL Certificates</CardTitle>
              <CardDescription>Manage SSL certificates and security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <SSLCertificates />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subdomains">
          <Card>
            <CardHeader>
              <CardTitle>Subdomain Management</CardTitle>
              <CardDescription>Configure subdomains for different services</CardDescription>
            </CardHeader>
            <CardContent>
              <SubdomainManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
