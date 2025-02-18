"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AccountManagement() {
  const [accounts, setAccounts] = useState([])
  const [newAccount, setNewAccount] = useState({ name: "", type: "", balance: "" })

  const handleInputChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value })
  }

  const handleAddAccount = () => {
    setAccounts([...accounts, newAccount])
    setNewAccount({ name: "", type: "", balance: "" })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">账户管理</h2>
      <div className="flex gap-4 mb-4">
        <Input type="text" name="name" value={newAccount.name} onChange={handleInputChange} placeholder="账户名称" />
        <Input type="text" name="type" value={newAccount.type} onChange={handleInputChange} placeholder="账户类型" />
        <Input
          type="number"
          name="balance"
          value={newAccount.balance}
          onChange={handleInputChange}
          placeholder="余额"
        />
        <Button onClick={handleAddAccount}>添加账户</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>账户名称</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>余额</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell>{account.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

