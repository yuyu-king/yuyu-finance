import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { AccountSummary } from "@/components/account-summary"
import { QuickEntry } from "@/components/quick-entry"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">财务仪表板</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="transactions">流水</TabsTrigger>
          <TabsTrigger value="accounts">账户</TabsTrigger>
          <TabsTrigger value="bills">账单</TabsTrigger>
          <TabsTrigger value="reports">报表</TabsTrigger>
        </TabsList>


        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总资产</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥120,231.89</div>
                <p className="text-xs text-muted-foreground">+2.5% 从上月</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">本月支出</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥15,231.89</div>
                <p className="text-xs text-muted-foreground">-4% 从上月</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">本月收入</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥25,231.89</div>
                <p className="text-xs text-muted-foreground">+1.2% 从上月</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">净收入</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥10,000.00</div>
                <p className="text-xs text-muted-foreground">+8% 从上月</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>概览</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>近期交易</CardTitle>
                <CardDescription>您有 10 笔交易本月。</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>账户概览</CardTitle>
            </CardHeader>
            <CardContent>
              <AccountSummary />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>快速记账</CardTitle>
            </CardHeader>
            <CardContent>
              <QuickEntry />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

