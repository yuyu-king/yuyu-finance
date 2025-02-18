"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "1月",
    收入: 4000,
    支出: 2400,
  },
  {
    name: "2月",
    收入: 3000,
    支出: 1398,
  },
  {
    name: "3月",
    收入: 2000,
    支出: 9800,
  },
  {
    name: "4月",
    收入: 2780,
    支出: 3908,
  },
  {
    name: "5月",
    收入: 1890,
    支出: 4800,
  },
  {
    name: "6月",
    收入: 2390,
    支出: 3800,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `¥${value}`}
        />
        <Bar dataKey="收入" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="支出" fill="#fd4b4b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

