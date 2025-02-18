"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickEntry } from "@/components/quick-entry"
import { ImportTransactions } from "@/components/import-transactions"
import { TransactionList } from "@/components/transaction-list"
import { TransactionReconciliation } from "@/components/transaction-reconciliation"

export function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("quick-entry")

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button
          variant={activeTab === "quick-entry" ? "default" : "outline"}
          onClick={() => setActiveTab("quick-entry")}
        >
          快速记账
        </Button>
        <Button variant={activeTab === "import" ? "default" : "outline"} onClick={() => setActiveTab("import")}>
          导入账单
        </Button>
        <Button variant={activeTab === "list" ? "default" : "outline"} onClick={() => setActiveTab("list")}>
          流水列表
        </Button>
        <Button
          variant={activeTab === "reconciliation" ? "default" : "outline"}
          onClick={() => setActiveTab("reconciliation")}
        >
          对账
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === "quick-entry" && "快速记账"}
            {activeTab === "import" && "导入账单"}
            {activeTab === "list" && "流水列表"}
            {activeTab === "reconciliation" && "对账"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === "quick-entry" && <QuickEntry />}
          {activeTab === "import" && <ImportTransactions />}
          {activeTab === "list" && <TransactionList />}
          {activeTab === "reconciliation" && <TransactionReconciliation />}
        </CardContent>
      </Card>
    </div>
  )
}

