"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ImportTransactions() {
  const [file, setFile] = useState<File | null>(null)
  const [importType, setImportType] = useState("")
  const [previewData, setPreviewData] = useState<any[] | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!file || !importType) return

    // 这里应该是实际的文件上传和处理逻辑
    // 为了演示，我们只是模拟一个异步操作并返回一些假数据
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setPreviewData([
      { date: "2023-08-20", type: "支出", amount: 100, description: "超市购物" },
      { date: "2023-08-21", type: "收入", amount: 5000, description: "工资" },
      { date: "2023-08-22", type: "支出", amount: 200, description: "餐厅" },
    ])
  }

  const handleConfirm = () => {
    // 这里应该是将预览数据保存到数据库的逻辑
    console.log("数据已保存到数据库")
    setPreviewData(null)
    setFile(null)
    setImportType("")
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="import-type">导入类型</Label>
          <Select onValueChange={setImportType}>
            <SelectTrigger id="import-type">
              <SelectValue placeholder="选择导入类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alipay">支付宝</SelectItem>
              <SelectItem value="wechat">微信</SelectItem>
              <SelectItem value="bank">银行对账单</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="file">选择文件</Label>
          <Input id="file" type="file" onChange={handleFileChange} />
        </div>
      </div>
      <Button onClick={handleImport} disabled={!file || !importType}>
        导入
      </Button>

      {previewData && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">预览数据</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日期</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>描述</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleConfirm}>确认导入</Button>
        </div>
      )}
    </div>
  )
}

