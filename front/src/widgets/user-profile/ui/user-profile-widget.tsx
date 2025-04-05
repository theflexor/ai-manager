import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Edit } from "lucide-react"

export function UserProfileWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Профиль</CardTitle>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
          <AvatarFallback>ИП</AvatarFallback>
        </Avatar>

        <h3 className="text-xl font-medium">Иван Петров</h3>
        <p className="text-sm text-muted-foreground mb-4">ivan@example.com</p>

        <div className="w-full space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Статус</span>
            <span className="text-sm font-medium">Активный</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Дата регистрации</span>
            <span className="text-sm font-medium">01.01.2023</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">ID пользователя</span>
            <span className="text-sm font-medium">USR-12345</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

