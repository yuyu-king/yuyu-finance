// POST /api/import
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json(); // 获取前端传来的 JSON 数据

  // 模拟保存到数据库
  console.log('导入数据:', body);

  return NextResponse.json({ success: true });
}