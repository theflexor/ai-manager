'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { UserPlus, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { UserSearch } from '@/shared/ui/user-search';
import { useAddSubscriptionMemberMutation } from '@/entities/subscription-member/model/queries';
import { useParams } from 'next/navigation';

interface User {
  id: number | string;
  email: string;
  name?: string;
  isEmailVerified?: boolean;
  profilePicture?: string;
  avatar?: string;
  role?: string;
}

export function InviteForm() {
  const subscriptionId = useParams<{ id: string }>()?.id;

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isInviting, setIsInviting] = useState(false);

  const { mutateAsync } = useAddSubscriptionMemberMutation();

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const clearSelectedUser = () => {
    setSelectedUser(null);
  };

  console.log(selectedUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      toast.error('Пожалуйста, выберите пользователя из результатов поиска');
      return;
    }

    setIsInviting(true);
    mutateAsync({
      subscriptionId: Number(subscriptionId),
      userId: Number(selectedUser.id),
    })
      .finally(() => {
        setIsInviting(false);
      })
      .then(() => {
        clearSelectedUser();
      });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="shadow-lg border border-border">
        <CardHeader className="pb-6 pt-8 px-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-muted border">
              <UserPlus className="h-6 w-6 text-foreground" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-semibold">
            Пригласить участника
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Найдите пользователя по email адресу
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <UserSearch
              onUserSelect={handleUserSelect}
              selectedUser={selectedUser}
              clearSelectedUser={clearSelectedUser}
            />

            <Button
              type="submit"
              className="w-full h-12 font-medium shadow-sm hover:shadow-md transition-all duration-200"
              disabled={isInviting || !selectedUser}
            >
              {isInviting ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Отправка приглашения...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Отправить приглашение</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

