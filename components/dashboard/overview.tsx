"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    MBTQ: 1200,
    VR4Deaf: 900,
    MBTQUniverse: 1400,
    "360 Magicians": 800,
  },
  {
    name: "Feb",
    MBTQ: 1300,
    VR4Deaf: 1000,
    MBTQUniverse: 1500,
    "360 Magicians": 900,
  },
  {
    name: "Mar",
    MBTQ: 1400,
    VR4Deaf: 1100,
    MBTQUniverse: 1600,
    "360 Magicians": 950,
  },
  {
    name: "Apr",
    MBTQ: 1500,
    VR4Deaf: 1200,
    MBTQUniverse: 1700,
    "360 Magicians": 1000,
  },
  {
    name: "May",
    MBTQ: 1700,
    VR4Deaf: 1300,
    MBTQUniverse: 1800,
    "360 Magicians": 1100,
  },
  {
    name: "Jun",
    MBTQ: 1800,
    VR4Deaf: 1400,
    MBTQUniverse: 1900,
    "360 Magicians": 1200,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="MBTQ" fill="#ec4899" radius={[4, 4, 0, 0]} />
        <Bar dataKey="VR4Deaf" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="MBTQUniverse" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="360 Magicians" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
