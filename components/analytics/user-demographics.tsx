"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data for user demographics
const ageDistribution = [
  { name: "18-24", value: 15, color: "#ec4899" },
  { name: "25-34", value: 32, color: "#8b5cf6" },
  { name: "35-44", value: 28, color: "#3b82f6" },
  { name: "45-54", value: 18, color: "#10b981" },
  { name: "55+", value: 7, color: "#6b7280" },
]

const userTypeDistribution = [
  { name: "Deaf", value: 65, color: "#ec4899" },
  { name: "Hard of Hearing", value: 20, color: "#8b5cf6" },
  { name: "Interpreter", value: 10, color: "#3b82f6" },
  { name: "Other", value: 5, color: "#6b7280" },
]

const userGrowthData = [
  { month: "Jan", users: 12500 },
  { month: "Feb", users: 14200 },
  { month: "Mar", users: 16800 },
  { month: "Apr", users: 19500 },
  { month: "May", users: 22300 },
  { month: "Jun", users: 25800 },
]

const topRegions = [
  { region: "United States", users: 12500, growth: "+18%" },
  { region: "United Kingdom", users: 5800, growth: "+15%" },
  { region: "Canada", users: 3200, growth: "+22%" },
  { region: "Australia", users: 2800, growth: "+12%" },
  { region: "Japan", users: 1900, growth: "+28%" },
]

export function UserDemographics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>User breakdown by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {ageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Type</CardTitle>
            <CardDescription>Distribution by user category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {userTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Monthly user growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Regions</CardTitle>
          <CardDescription>User distribution by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead>Distribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topRegions.map((region, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{region.region}</TableCell>
                  <TableCell>{region.users.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      {region.growth}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-pink-600 h-2.5 rounded-full"
                        style={{ width: `${(region.users / 12500) * 100}%` }}
                      ></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
