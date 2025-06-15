import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PinkSync() {
  return (
    <Card>
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="font-mono text-center">PinkSync API</CardTitle>
      </CardHeader>
      <CardContent className="p-6 font-mono text-sm">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          {`// Initialize PinkSync as a single accessibility layer
import { PinkSync } from '@pinksync/core';

const accessibilityLayer = new PinkSync({
  platform: 'web',
  accessibilityFirst: true,
  features: {
    visualAlerts: true,
    hapticFeedback: true,
    signLanguageSupport: 'ASL'
  }
});

// Transform any content through the single layer
await accessibilityLayer.transform({
  content: complexText,
  outputFormat: 'video',
  signLanguage: 'ASL'
});`}
        </pre>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">One Integration</h3>
            <p className="text-xs text-gray-600">
              A single API integration transforms all your digital content for deaf accessibility
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">One Consistent Experience</h3>
            <p className="text-xs text-gray-600">
              Users get the same accessibility experience across all platforms and environments
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
