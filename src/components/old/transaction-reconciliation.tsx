"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
    reconciled: false,
  },
  {
    id: 2,
    date: "2023-08-21",
    type: "收入",
    amount: 5000,
    description: "工资",
    fromAccount: "公司",
    toAccount: "工商银行",
    reconciled: false,
  },
  {
    id: 3,
    date: "2023-08-22",
    type: "支出",
    amount: 200,
    description: "餐厅",
    fromAccount: "招商银行",
    toAccount: "餐厅",
    reconciled: false,
  },
  {
    id: 4,
    date: "2023-08-23",
    type: "转账",
    amount: 1000,
    description: "转账给朋友",
    fromAccount: "工商银行",
    toAccount: "朋友的账户",
    reconciled: false,
  },
]

export function TransactionReconciliation() {
  const [reconciledTransactions, setReconciledTransactions] = useState(transactions)

  const handleReconcile = (id: number) => {
    setReconciledTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, reconciled: !transaction.reconciled } : transaction,
      ),
    )
  }

  const handleReconcileAll = () => {
    setReconciledTransactions((prev) => prev.map((transaction) => ({ ...transaction, reconciled: true })))
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleReconcileAll}>全部对账</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>日期</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>金额</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>来源账户</TableHead>
            <TableHead>目标账户</TableHead>
            <TableHead>对账状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reconciledTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.fromAccount}</TableCell>
              <TableCell>{transaction.toAccount}</TableCell>
              <TableCell>
                <Checkbox checked={transaction.reconciled} onCheckedChange={() => handleReconcile(transaction.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

