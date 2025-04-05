"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Home, Settings, User, Wallet } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

interface NavItem {
  icon: React.ElementType
  label: string
  active?: boolean
}

export function DashboardSidebar() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    { icon: Home, label: "Главная", active: false },
    { icon: User, label: "Профиль", active: false },
    { icon: Wallet, label: "Кошелек", active: true },
    { icon: CreditCard, label: "Транзакции", active: false },
    { icon: Settings, label: "Настройки", active: false },
  ])

  const handleNavClick = (index: number) => {
    setNavItems(
      navItems.map((item, i) => ({
        ...item,
        active: i === index,
      })),
    )
  }

  return (
    <aside className="w-64 border-r bg-white h-[calc(100vh-4rem)] p-4 hidden md:block">
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn("w-full justify-start", item.active && "bg-gray-100 font-medium")}
            onClick={() => handleNavClick(index)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  )
}

