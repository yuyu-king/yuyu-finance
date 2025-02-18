import { NextResponse } from "next/server";
import { Transaction } from "@/domain/transactions/transaction";
import { TransactionService } from "@/domain/transactions/transactionService";

const transactionService = new TransactionService();

export async function GET() {
  return NextResponse.json(transactionService.getAllTransactions());
}

export async function POST(req: Request) {
  const data = await req.json();
  const transaction = new Transaction(data.id, data.amount, data.category, data.accountId, new Date(data.date));
  transactionService.addTransaction(transaction);
  return NextResponse.json({ message: "Transaction added" });
}
