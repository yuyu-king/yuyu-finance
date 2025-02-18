"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QuickEntry() {
  const [entryType, setEntryType] = useState("expense")

  return (
    <div className="space-y-4">
      <RadioGroup defaultValue="expense" onValueChange={setEntryType} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="expense" id="expense" />
          <Label htmlFor="expense">支出</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="income" id="income" />
          <Label htmlFor="income">收入</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="transfer" id="transfer" />
          <Label htmlFor="transfer">转账</Label>
        </div>
      </RadioGroup>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="amount">金额</Label>
          <Input id="amount" placeholder="输入金额" type="number" step="0.01" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">日期</Label>
          <Input id="date" type="date" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="category">类别</Label>
        <Select>
          <SelectTrigger id="category">
            <SelectValue placeholder="选择类别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="food">食品</SelectItem>
            <SelectItem value="transport">交通</SelectItem>
            <SelectItem value="entertainment">娱乐</SelectItem>
            <SelectItem value="utilities">水电煤</SelectItem>
            <SelectItem value="salary">工资</SelectItem>
            <SelectItem value="investment">投资</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="account">账户</Label>
        <Select>
          <SelectTrigger id="account">
            <SelectValue placeholder="选择账户" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="icbc">工商银行储蓄卡</SelectItem>
            <SelectItem value="alipay">支付宝</SelectItem>
            <SelectItem value="wechat">微信钱包</SelectItem>
            <SelectItem value="cmb">招商银行信用卡</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">描述</Label>
        <Input id="description" placeholder="输入交易描述" />
      </div>
      <Button className="w-full">保存交易</Button>
    </div>
  )
}

