"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data
const models = [
  {
    name: "Text-to-Sign Generator v2.1",
    type: "Translation",
    status: "Active",
    accuracy: "92.4%",
    lastUpdated: "2 days ago",
    languages: ["ASL", "BSL"],
  },
  {
    name: "Sign Emotion Detector v1.5",
    type: "Recognition",
    status: "Active",
    accuracy: "89.7%",
    lastUpdated: "1 week ago",
    languages: ["ASL"],
  },
  {
    name: "Fingerspelling Translator v3.0",
    type: "Translation",
    status: "Active",
    accuracy: "95.2%",
    lastUpdated: "3 days ago",
    languages: ["ASL", "BSL", "JSL"],
  },
  {
    name: "Sign Language Classifier v2.0",
    type: "Classification",
    status: "Training",
    accuracy: "87.1%",
    lastUpdated: "1 day ago",
    languages: ["ASL", "BSL"],
  },
  {
    name: "Gesture Recognition v1.2",
    type: "Recognition",
    status: "Inactive",
    accuracy: "82.3%",
    lastUpdated: "3 months ago",
    languages: ["ASL"],
  },
]

export function AIModelList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.languages.some((lang) => lang.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Training":
        return "bg-blue-500"
      case "Inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search models..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Model
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead>Languages</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredModels.map((model, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>{model.type}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(model.status)}>{model.status}</Badge>
              </TableCell>
              <TableCell>{model.accuracy}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {model.languages.map((lang, i) => (
                    <Badge key={i} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{model.lastUpdated}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Model</DropdownMenuItem>
                    <DropdownMenuItem>Deploy</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    {model.status === "Active" ? (
                      <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
