"use client"

import { useState, useEffect, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for Sankey diagram
const journeyData = {
  nodes: [
    { id: "Landing", name: "Landing Page" },
    { id: "TextToSign", name: "Text-to-Sign Translator" },
    { id: "VideoRepo", name: "Video Repository" },
    { id: "RealTime", name: "Real-time Translation" },
    { id: "Community", name: "Community Validation" },
    { id: "Settings", name: "Accessibility Settings" },
    { id: "Profile", name: "User Profile" },
    { id: "Exit", name: "Exit" },
  ],
  links: [
    { source: "Landing", target: "TextToSign", value: 2500 },
    { source: "Landing", target: "VideoRepo", value: 1800 },
    { source: "Landing", target: "RealTime", value: 1200 },
    { source: "TextToSign", target: "VideoRepo", value: 1100 },
    { source: "TextToSign", target: "RealTime", value: 800 },
    { source: "TextToSign", target: "Exit", value: 600 },
    { source: "VideoRepo", target: "Community", value: 750 },
    { source: "VideoRepo", target: "TextToSign", value: 650 },
    { source: "VideoRepo", target: "Exit", value: 400 },
    { source: "RealTime", target: "Settings", value: 500 },
    { source: "RealTime", target: "Exit", value: 700 },
    { source: "Community", target: "Profile", value: 400 },
    { source: "Community", target: "Exit", value: 350 },
    { source: "Settings", target: "Exit", value: 500 },
    { source: "Profile", target: "Exit", value: 400 },
  ],
}

export function JourneyFlowVisualization() {
  const [userType, setUserType] = useState("all")
  const [platform, setPlatform] = useState("all")
  const [timeRange, setTimeRange] = useState("30days")
  const svgRef = useRef<SVGSVGElement>(null)

  // This would normally be a D3.js Sankey diagram
  // For this example, we'll create a simplified visual representation
  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous content
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild)
    }

    const svg = svgRef.current
    const width = svg.clientWidth
    const height = svg.clientHeight
    const nodeWidth = 150
    const nodeHeight = 40
    const nodeGap = 60
    const columnGap = 200

    // Create columns for our simplified flow
    const columns = [
      ["Landing"],
      ["TextToSign", "VideoRepo", "RealTime"],
      ["Community", "Settings"],
      ["Profile"],
      ["Exit"],
    ]

    // Draw nodes
    columns.forEach((column, colIndex) => {
      const columnX = 50 + colIndex * columnGap
      column.forEach((nodeId, nodeIndex) => {
        const node = journeyData.nodes.find((n) => n.id === nodeId)
        if (!node) return

        // Calculate node position
        const nodeY = 50 + nodeIndex * (nodeHeight + nodeGap)

        // Create node rectangle
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute("x", columnX.toString())
        rect.setAttribute("y", nodeY.toString())
        rect.setAttribute("width", nodeWidth.toString())
        rect.setAttribute("height", nodeHeight.toString())
        rect.setAttribute("rx", "6")
        rect.setAttribute("ry", "6")
        rect.setAttribute("fill", nodeId === "Landing" ? "#ec4899" : nodeId === "Exit" ? "#6b7280" : "#8b5cf6")
        rect.setAttribute("opacity", "0.8")
        svg.appendChild(rect)

        // Create node text
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", (columnX + nodeWidth / 2).toString())
        text.setAttribute("y", (nodeY + nodeHeight / 2).toString())
        text.setAttribute("text-anchor", "middle")
        text.setAttribute("dominant-baseline", "middle")
        text.setAttribute("fill", "white")
        text.setAttribute("font-size", "12")
        text.textContent = node.name
        svg.appendChild(text)

        // Store node position for links
        node.x = columnX + nodeWidth
        node.y = nodeY + nodeHeight / 2
      })
    })

    // Draw links
    journeyData.links.forEach((link) => {
      const sourceNode = journeyData.nodes.find((n) => n.id === link.source)
      const targetNode = journeyData.nodes.find((n) => n.id === link.target)

      if (
        !sourceNode ||
        !targetNode ||
        !("x" in sourceNode) ||
        !("y" in sourceNode) ||
        !("x" in targetNode) ||
        !("y" in targetNode)
      )
        return

      // Calculate link width based on value
      const linkWidth = Math.max(1, Math.min(10, link.value / 250))

      // Create path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      const sourceX = sourceNode.x as number
      const sourceY = sourceNode.y as number
      const targetX = (targetNode as any).x - nodeWidth
      const targetY = (targetNode as any).y

      const controlPoint1X = sourceX + (targetX - sourceX) * 0.4
      const controlPoint2X = sourceX + (targetX - sourceX) * 0.6

      path.setAttribute(
        "d",
        `M ${sourceX} ${sourceY} C ${controlPoint1X} ${sourceY}, ${controlPoint2X} ${targetY}, ${targetX} ${targetY}`,
      )
      path.setAttribute("stroke", "#ec4899")
      path.setAttribute("stroke-width", linkWidth.toString())
      path.setAttribute("fill", "none")
      path.setAttribute("opacity", "0.5")
      svg.appendChild(path)
    })
  }, [userType, platform, timeRange])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="all" onValueChange={setUserType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="User Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="deaf">Deaf Users</SelectItem>
              <SelectItem value="hoh">Hard of Hearing</SelectItem>
              <SelectItem value="interpreter">Interpreters</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="mbtq">MBTQ.dev</SelectItem>
              <SelectItem value="universe">MBTQUniverse</SelectItem>
              <SelectItem value="vr">VR4Deaf</SelectItem>
              <SelectItem value="magicians">360 Magicians</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="30days" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="border rounded-lg p-1 bg-background">
        <svg ref={svgRef} width="100%" height="600" className="overflow-visible"></svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Most Common Path</h3>
              <Badge className="bg-pink-500">42% of Users</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Landing → Text-to-Sign → Video Repository → Exit</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Highest Engagement</h3>
              <Badge className="bg-purple-500">8.5 min avg</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Users who visit Community Validation spend the most time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Key Insight</h3>
              <Badge className="bg-blue-500">Opportunity</Badge>
            </div>
            <p className="text-sm text-muted-foreground">65% of users don't discover Real-time Translation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
