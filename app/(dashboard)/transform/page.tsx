import type { Metadata } from "next"
import { TransformTool } from "@/components/transform-tool"

export const metadata: Metadata = {
  title: "Transform Content - PinkSync",
  description: "Transform text content into sign language videos",
}

export default function TransformPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Transform Content</h1>
      <p className="text-muted-foreground mb-6">Convert text content into accessible sign language videos</p>

      <TransformTool />
    </div>
  )
}
