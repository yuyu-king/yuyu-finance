import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>超市</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">超市购物</p>
          <p className="text-sm text-muted-foreground">2023-08-15</p>
        </div>
        <div className="ml-auto font-medium">-¥89.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>工资</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">工资收入</p>
          <p className="text-sm text-muted-foreground">2023-08-10</p>
        </div>
        <div className="ml-auto font-medium">+¥12,000.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>餐厅</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">餐厅用餐</p>
          <p className="text-sm text-muted-foreground">2023-08-08</p>
        </div>
        <div className="ml-auto font-medium">-¥245.50</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>电影</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">电影票</p>
          <p className="text-sm text-muted-foreground">2023-08-05</p>
        </div>
        <div className="ml-auto font-medium">-¥120.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>利息</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">储蓄利息</p>
          <p className="text-sm text-muted-foreground">2023-08-01</p>
        </div>
        <div className="ml-auto font-medium">+¥15.23</div>
      </div>
    </div>
  )
}

