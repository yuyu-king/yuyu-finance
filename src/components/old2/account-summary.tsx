import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const accounts = [
  { name: "工商银行储蓄卡", balance: 50000.0, type: "储蓄" },
  { name: "支付宝", balance: 2500.5, type: "电子钱包" },
  { name: "招商银行信用卡", balance: -3000.0, type: "信用卡" },
  { name: "微信钱包", balance: 1200.75, type: "电子钱包" },
  { name: "建设银行定期存款", balance: 100000.0, type: "定期存款" },
]

export function AccountSummary() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>账户名称</TableHead>
          <TableHead>类型</TableHead>
          <TableHead className="text-right">余额</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.name}>
            <TableCell className="font-medium">{account.name}</TableCell>
            <TableCell>{account.type}</TableCell>
            <TableCell className="text-right">¥{account.balance.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

