# 鱼鱼资金管理系统

一个现代化的个人资金管理系统，帮助您更好地管理财务。

## 功能特性

### 🏠 首页总览
- 总资产、收入、支出统计
- 收支趋势图表
- 支出分类饼图
- 账户概览列表

### 💳 账户管理
- 多账户管理（储蓄卡、信用卡、电子钱包等）
- 添加、编辑、删除账户
- 账户余额统计
- 账户类型分类

### 📊 流水记录
- 详细的交易记录管理
- 收入/支出分类
- 搜索和筛选功能
- 标签系统
- 多账户支持

## 技术栈

- **前端框架**: Next.js 15 + React 19
- **样式**: Tailwind CSS 4
- **图标**: Lucide React
- **图表**: Recharts
- **语言**: TypeScript
- **开发语言**: 中文

## 快速开始

1. 克隆项目
```bash
git clone <repository-url>
cd yuyu-finance
```

2. 安装依赖
```bash
npm install --legacy-peer-deps
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
yuyu-finance/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页总览
│   ├── accounts/          # 账户管理页面
│   ├── transactions/      # 流水记录页面
│   └── layout.tsx         # 根布局
├── components/            # 可复用组件
│   └── navigation.tsx     # 导航组件
├── lib/                   # 工具函数
│   └── utils.ts           # 通用工具
└── public/                # 静态资源
```

## 主要页面

### 首页总览 (/)
- 显示财务概览信息
- 包含统计卡片和图表
- 账户余额汇总

### 账户管理 (/accounts)
- 管理所有账户信息
- 支持添加、编辑、删除账户
- 账户类型和余额管理

### 流水记录 (/transactions)
- 查看所有交易记录
- 支持搜索和筛选
- 添加新的交易记录

## 开发说明

- 项目使用 TypeScript 进行类型检查
- 采用 Tailwind CSS 进行样式设计
- 使用 Lucide React 提供图标
- 图表使用 Recharts 库

## 未来计划

- [ ] 数据持久化（数据库集成）
- [ ] 用户认证系统
- [ ] 预算管理功能
- [ ] 财务报告生成
- [ ] 移动端适配优化
- [ ] 数据导入导出功能

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
