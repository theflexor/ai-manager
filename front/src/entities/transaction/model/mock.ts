import type { Transaction } from "./types"

export const mockTransactions: Transaction[] = [
  {
    id: "TX-1234",
    type: "deposit",
    amount: 500,
    date: "2023-04-01",
    description: "Пополнение счета",
    status: "completed",
  },
  {
    id: "TX-1235",
    type: "withdrawal",
    amount: 150,
    date: "2023-03-28",
    description: "Вывод средств",
    status: "completed",
  },
  {
    id: "TX-1236",
    type: "deposit",
    amount: 1000,
    date: "2023-03-25",
    description: "Пополнение счета",
    status: "completed",
  },
  {
    id: "TX-1237",
    type: "withdrawal",
    amount: 250,
    date: "2023-03-20",
    description: "Вывод средств",
    status: "pending",
  },
]

