"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    "Translation Accuracy": 85,
    "User Satisfaction": 78,
    "Response Time": 92,
  },
  {
    name: "Feb",
    "Translation Accuracy": 86,
    "User Satisfaction": 81,
    "Response Time": 93,
  },
  {
    name: "Mar",
    "Translation Accuracy": 88,
    "User Satisfaction": 83,
    "Response Time": 94,
  },
  {
    name: "Apr",
    "Translation Accuracy": 89,
    "User Satisfaction": 85,
    "Response Time": 95,
  },
  {
    name: "May",
    "Translation Accuracy": 91,
    "User Satisfaction": 87,
    "Response Time": 96,
  },
  {
    name: "Jun",
    "Translation Accuracy": 92,
    "User Satisfaction": 89,
    "Response Time": 97,
  },
]

export function AccessibilityMetrics() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="Translation Accuracy" stroke="#ec4899" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="User Satisfaction" stroke="#8b5cf6" strokeWidth={2} />
        <Line type="monotone" dataKey="Response Time" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
