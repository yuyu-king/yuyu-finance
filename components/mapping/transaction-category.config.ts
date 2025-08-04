import {
    Utensils,
    Car,
    ShoppingCart,
    Gamepad2,
    Home,
    TrendingUp,
    CreditCard,
} from "lucide-react";
import { TransactionCategory } from "@/lib/domain/transaction/enum/transaction-category.enum";

export interface CategoryMeta {
    label: string;
    icon: React.ComponentType<never>;
    color: string;
}

export const TransactionCategoryMap: Record<TransactionCategory, CategoryMeta> = {
    [TransactionCategory.Food]: {
        label: "餐饮",
        icon: Utensils,
        color: "#FF6B6B",
    },
    [TransactionCategory.Transport]: {
        label: "交通",
        icon: Car,
        color: "#4ECDC4",
    },
    [TransactionCategory.Shopping]: {
        label: "购物",
        icon: ShoppingCart,
        color: "#45B7D1",
    },
    [TransactionCategory.Entertainment]: {
        label: "娱乐",
        icon: Gamepad2,
        color: "#96CEB4",
    },
    [TransactionCategory.Housing]: {
        label: "住房",
        icon: Home,
        color: "#FFEAA7",
    },
    [TransactionCategory.Salary]: {
        label: "工资",
        icon: TrendingUp,
        color: "#10B981",
    },
    [TransactionCategory.Investment]: {
        label: "投资",
        icon: TrendingUp,
        color: "#8B5CF6",
    },
    [TransactionCategory.Other]: {
        label: "其他",
        icon: CreditCard,
        color: "#6B7280",
    },
};