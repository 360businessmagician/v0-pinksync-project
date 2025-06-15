"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Upload, Play, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data
const signs = [
  {
    word: "Hello",
    language: "ASL",
    category: "Greeting",
    variants: 3,
    votes: 156,
    contributor: "Community",
    dateAdded: "2025-01-15",
  },
  {
    word: "Thank you",
    language: "BSL",
    category: "Courtesy",
    variants: 2,
    votes: 98,
    contributor: "Expert",
    dateAdded: "2025-02-03",
  },
  {
    word: "Please",
    language: "ASL",
    category: "Courtesy",
    variants: 1,
    votes: 87,
    contributor: "Community",
    dateAdded: "2025-02-10",
  },
  {
    word: "Help",
    language: "ASL",
    category: "Emergency",
    variants: 2,
    votes: 112,
    contributor: "Expert",
    dateAdded: "2025-01-22",
  },
  {
    word: "Family",
    language: "BSL",
    category: "Relationships",
    variants: 1,
    votes: 76,
    contributor: "Community",
    dateAdded: "2025-02-18",
  },
  {
    word: "Friend",
    language: "ASL",
    category: "Relationships",
    variants: 2,
    votes: 92,
    contributor: "Expert",
    dateAdded: "2025-01-30",
  },
  {
    word: "Work",
    language: "ASL",
    category: "Employment",
    variants: 1,
    votes: 68,
    contributor: "Community",
    dateAdded: "2025-02-05",
  },
]

export function SignLibrary() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSigns = signs.filter(
    (sign) =>
      sign.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search signs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Add Sign
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Word/Phrase</TableHead>
            <TableHead>Preview</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Variants</TableHead>
            <TableHead>Votes</TableHead>
            <TableHead>Contributor</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSigns.map((sign, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{sign.word}</TableCell>
              <TableCell>
                <div className="bg-gray-800 w-16 h-12 flex items-center justify-center rounded overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 opacity-50"></div>
                  <Button variant="ghost" size="icon" className="relative z-10 h-6 w-6 text-white">
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{sign.language}</Badge>
              </TableCell>
              <TableCell>{sign.category}</TableCell>
              <TableCell>{sign.variants}</TableCell>
              <TableCell>{sign.votes}</TableCell>
              <TableCell>
                <Badge variant={sign.contributor === "Expert" ? "default" : "secondary"}>{sign.contributor}</Badge>
              </TableCell>
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
                    <DropdownMenuItem>Edit Sign</DropdownMenuItem>
                    <DropdownMenuItem>Add Variant</DropdownMenuItem>
                    <DropdownMenuItem>Download Video</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
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
