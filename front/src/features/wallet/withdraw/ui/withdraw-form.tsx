"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { ArrowUpRight } from "lucide-react"

export function WithdrawForm() {
  const [amount, setAmount] = useState("")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setAmount(value)
  }

  const handleWithdraw = () => {
    // Handle withdraw logic
    console.log(`Withdrawing ${amount}`)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input type="text" placeholder="Введите сумму" value={amount} onChange={handleAmountChange} />
      </div>
      <Button className="w-full" variant="outline" onClick={handleWithdraw}>
        <ArrowUpRight className="mr-2 h-4 w-4" />
        Вывести средства
      </Button>
    </div>
  )
}

