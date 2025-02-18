"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  {
    id: 1,
    date: "2023-08-20",
    type: "支出",
    amount: 100,
    description: "超市购物",
    fromAccount: "工商银行",
    toAccount: "超市",
  },
  {
    id: 2,
    date: "2023-08-21",
    type: "收入",
    amount: 5000,
    description: "工资",
    fromAccount: "公司",
    toAccount: "工商银行",
  },
  {
    id: 3,
    date: "2023-08-22",
    type: "支出",
    amount: 200,
    description: "餐厅",
    fromAccount: "招商银行",
    toAccount: "餐厅",
  },
  {
    id: 4,
    date: "2023-08-23",
    type: "转账",
    amount: 1000,
    description: "转账给朋友",
    fromAccount: "工商银行",
    toAccount: "朋友的账户",
  },
]

export function TransactionList() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    fromAccount: "",
    toAccount: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (!filters.startDate || transaction.date >= filters.startDate) &&
      (!filters.endDate || transaction.date <= filters.endDate) &&
      (!filters.type || transaction.type === filters.type) &&
      (!filters.fromAccount || transaction.fromAccount === filters.fromAccount) &&
      (!filters.toAccount || transaction.toAccount === filters.toAccount)
    )
  })

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div className="grid gap-2">
          <Label htmlFor="start-date">开始日期</Label>
          <Input
            id="start-date"
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="end-date">结束日期</Label>
          <Input
            id="end-date"
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type">交易类型</Label>
          <Select onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="选择类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="支出">支出</SelectItem>
              <SelectItem value="收入">收入</SelectItem>
              <SelectItem value="转账">转账</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="from-account">来源账户</Label>
          <Input
            id="from-account"
            value={filters.fromAccount}
            onChange={(e) => handleFilterChange("fromAccount", e.target.value)}
            placeholder="输入来源账户"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="to-account">目标账户</Label>
          <Input
            id="to-account"
            value={filters.toAccount}
            onChange={(e) => handleFilterChange("toAccount", e.target.value)}
            placeholder="输入目标账户"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>日期</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>金额</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>来源账户</TableHead>
            <TableHead>目标账户</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.fromAccount}</TableCell>
              <TableCell>{transaction.toAccount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

